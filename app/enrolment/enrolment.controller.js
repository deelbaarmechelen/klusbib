import PaymentService from "../services/payment.service";

EnrolmentController.$inject = ['TokenService', 'UserService','Flash', 'AuthService', '$location', '$window', '$state',
    'PaymentService', 'EnrolmentService', 'moment', 'User'];

export default function EnrolmentController(TokenService, UserService, Flash, AuthService, $location, $window, $state,
                                            PaymentService, EnrolmentService, moment, User) {
    var vm = this;

    vm.profileLinkEnabled = true;
    vm.paymentLinkEnabled = false;
    vm.confirmLinkEnabled = false;
    vm.showProgressBar = false;
    vm.renewalAmount = '20';
    vm.enrolmentAmount = '30';
    vm.admin = false;
    vm.loggedUser = function() {
        var user = User.get();
        if (typeof(user.id) !== 'undefined') {
            UserService.GetById(user.id).then(function (response) {
                if (response.success) {
                    console.log('user lookup succeeded');
                    if (response.message.role === "admin" && response.message.state === "ACTIVE") {
                        vm.admin = true;
                    }
                } else {
                    console.log('error retrieving user with id ' + user.id);
                }
            });
        }
    }();
    vm.isRenewal = function() {
        if ($state.current.data && $state.current.data.renewal) {
            return $state.current.data.renewal;
        }
        return false;
    };
    vm.isAdmin = function() {
        return vm.admin;
    };
    vm.init = function () {
        var params = $location.search();
        vm.email = params.email;
        if ($state.current.data ) { // reset state
            $state.current.data = null;
        }
    };
    vm.enrolment = function () {
        Flash.clear();
        vm.showProgressBar = true;
        console.log('start enrolment for user ' + JSON.stringify(vm.user));
        var token = TokenService.GetGuestToken(success);

        function success(res) {
            console.log('token for guest: ' + JSON.stringify(res.data.token));
            vm.user.role = 'member';
            vm.user.webenrolment = true;
            UserService.Create(vm.user, res.data.token)
                .then(function (response) {
                vm.showProgressBar = false;
                if (response.success) {
                    vm.user.user_id = response.message.user_id;
                    $state.get('enrolment').data.user = response.message;
                    $state.go('^.payment');
                    // $location.path('/lid-worden/payment');
                } else {
                    if (response.status == 409) {
                        // a user with that email already exists
                        Flash.create('warning', 'Je bent reeds ingeschreven. Log in om je gegevens na te kijken en/of laat een nieuwe bevestiging versturen', 0);
                        $location.path('/reset-pwd').search({email: vm.user.email});
                        return;
                    }
                    console.log("enrolment problem: " + response.message);
                    Flash.create('danger', 'Inschrijving mislukt: ' + response.message
                            + '. Blijft het probleem zich voordoen, stuur ons dan een bericht', 0);
                }
            });
        }

    };

    // from https://www.klusbib.be/#!/reset-pwd?email=my@email.com
    vm.renewal = function () {
        Flash.clear();
        var token = TokenService.GetGuestToken(success);
        function success(res) {
            console.log('token for guest: ' + JSON.stringify(res.data.token));
            UserService.GetByEmail(vm.email, res.data.token)
                .then(function (response) {
                    if (response.success) {
                        if (response.message.state === 'ACTIVE' || response.message.state === 'EXPIRED') {
                            $state.get('enrolment').data.user = response.message;
                            $state.get('enrolment').data.renewal = true;
                            return $state.go('enrolment.payment');
                        } else if (response.message.state == 'CHECK_PAYMENT') {
                            Flash.create('danger', 'Inschrijving nog niet voltooid, hernieuwing niet mogelijk', 0);
                        } else {
                            Flash.create('danger', 'Online lidmaatschap hernieuwing niet mogelijk, neem contact met ons op', 0);
                        }
                    } else {
                        if (response.status === 404) {
                            // user not found, start new enrolment
                            console.log("user not found: " + response.message);
                            Flash.create('danger', 'Geen lid gevonden voor dit email adres, hernieuwing niet mogelijk', 0);
                            return $state.go('enrolment.form');
                        } else {
                            console.log("renewal failed: " + response.message);
                            Flash.create('danger', 'Technisch probleem: ' + response.message
                                + '. Blijft het probleem zich voordoen, stuur ons dan een bericht', 0);
                        }
                    }
                });
        }

    }
    vm.checkEnrolment = function () {
        Flash.clear();
        var token = TokenService.GetGuestToken(success);
        function success(res) {
            console.log('token for guest: ' + JSON.stringify(res.data.token));
            UserService.GetByEmail(vm.email, res.data.token)
                .then(function (response) {
                    if (response.success) {
                        if (response.message.state === 'ACTIVE') {
                            Flash.create('success', 'Inschrijving is reeds succesvol voltooid', 0);
                        } else if (response.message.state == 'CHECK_PAYMENT') {
                            $state.get('enrolment').data.user = response.message
                            return $state.go('enrolment.payment');
                        } else if (response.message.state === 'EXPIRED') {
                            // TODO: redirect to online renewal
                            Flash.create('warning', 'Online verlengingen nog niet mogelijk', 0);
                        } else if (response.message.state === 'DISABLED') {
                            Flash.create('warning', 'Kon inschrijving niet hervatten...', 0);
                        } else if (response.message.state === 'DELETED') {
                            Flash.create('warning', 'Kon inschrijving niet hervatten...', 0);
                        } else {
                            Flash.create('warning', 'Kon inschrijving niet hervatten...', 0);
                        }
                    } else {
                        if (response.status === 404) {
                            // user not found, start new enrolment
                            console.log("user not found: " + response.message);
                            return $state.go('enrolment.form');
                        } else {
                            console.log("enrolment verification failed: " + response.message);
                            Flash.create('danger', 'Technisch probleem: ' + response.message
                                + '. Blijft het probleem zich voordoen, stuur ons dan een bericht', 0);
                        }
                    }
                });
        }
    }
    vm.enrolmentPayWith = function (paymentMean) {
        vm.payment_mode = 'MOLLIE';
        vm.enrolment_pay(paymentMean);
    }
    vm.enrolment_pay = function (paymentMean) {
        Flash.clear();
        vm.showProgressBar = true;
        $state.get('enrolment.confirm').data.payment_mode = vm.payment_mode;
        if (vm.payment_mode === 'TRANSFER_DONE') {
            $state.get('enrolment.confirm').data.paymentCompleted = true;
        }
        var userId = $state.current.data.user.user_id;
        var orderId = userId + '-' + moment().format('YYYYMMDDhhmmss');
        var renewal = $state.current.data.renewal;
        if (vm.payment_mode == 'TRANSFER'
            || vm.payment_mode == 'TRANSFER_DONE'
            || vm.payment_mode == 'CASH'
            || vm.payment_mode == 'MBON'
            || vm.payment_mode == 'LETS'
            || vm.payment_mode == 'PAYCONIQ'
            || vm.payment_mode == 'OVAM'
            || vm.payment_mode == 'SPONSORING'
            || vm.payment_mode == 'STROOM'
            || vm.payment_mode == 'OTHER'
        ) {
            // Manual transfer -> create payment (will trigger email with payment details)
            // and go directly to confirm page
            // Stroom enrolment -> will trigger confirm email to Stroom contact, go directly to confirm page
            // Other payment modes -> managed by volunteer in Klusbib, go directly to confirm page
            var handleEnrolmentTransferResponse = function (response) {
                vm.showProgressBar = false;
                if (response.success) {
                    return $state.go('^.confirm', {orderId: response.message.orderId});
                } else {
                    console.log("payment creation problem: " + response.message);
                    if (renewal) {
                        Flash.create('danger', 'Hernieuwing mislukt: ' + response.message
                            + '. Blijft het probleem zich voordoen, stuur ons dan een bericht', 0);
                    } else {
                        Flash.create('danger', 'Inschrijving mislukt: ' + response.message
                            + '. Blijft het probleem zich voordoen, stuur ons dan een bericht', 0);
                    }
                }
            }
            if (renewal) {
                EnrolmentService.Renewal(vm.payment_mode, userId, orderId)
                    .then(handleEnrolmentTransferResponse);
            } else {
                EnrolmentService.Enrolment(vm.payment_mode, userId, orderId)
                    .then(handleEnrolmentTransferResponse);
            }
            return;
        }
        if (vm.payment_mode == 'MOLLIE') {
            var redirectUrl = $state.href('enrolment.confirm',{orderId: orderId}, {absolute: true});
            var handleEnrolmentMollieResponse = function (response) {
                vm.showProgressBar = false;
                if (response.success) {
                    console.log(response);
                    $state.get('enrolment.confirm').data.orderId = response.message.orderId;
                    // if (true) { // 208 = Already reported, go directly to confirmation
                    if (response.status == 208) { // 208 = Already reported, go to renewal instead?
                        Flash.create('info', 'Je bent al ingeschreven, wil je je lidmaatschap hernieuwen?', 5000);
                        // return $state.go('^.confirm', {orderId: response.message.orderId});
                    } else {
                        $window.location.href = response.message.checkoutUrl;
                    }
                } else {
                    console.log("payment creation problem: " + response.message);
                    Flash.create('danger', 'Inschrijving mislukt: ' + response.message
                        + '. Blijft het probleem zich voordoen, stuur ons dan een bericht', 0);
                }
            }
            if (renewal) {
                EnrolmentService.Renewal(vm.payment_mode, userId, orderId, redirectUrl, paymentMean)
                    .then(handleEnrolmentMollieResponse);
            } else {
                EnrolmentService.Enrolment(vm.payment_mode, userId, orderId, redirectUrl, paymentMean)
                    .then(handleEnrolmentMollieResponse);
            }
            return;
        }

        console.log('Unknown payment mode: ' + vm.payment_mode);
        Flash.create('danger', 'Fout: Onbekende betalingswijze', 5000);

    };
    vm.resetPwd = function() {
        Flash.clear();
        AuthService.resetPwd(this.email, function () {
            Flash.create('success', 'Paswoord reset aangevraagd: check je mailbox', 5000);
        } , function () {
            Flash.create('danger', 'Er is een probleem opgetreden bij je paswoord reset aanvraag,'
                    + ' is het ingegeven email adres correct?', 5000);
        })
    }
    vm.resendConfirmation = function() {
        Flash.clear();
        AuthService.verifyEmail(this.email).then(function(response) {
            if (response.success) {
                Flash.create('success', 'Bericht verstuurd: check je mailbox', 5000);
            } else {
                if (response.status == 404) {
                    Flash.create('danger', 'Onbekende gebruiker,'
                            + ' is het ingegeven email adres correct?', 5000);
                } else if (response.status == 412) {
                    Flash.create('warning', 'Inschrijving reeds bevestigd. Geen email verificatie vereist voor deze gebruiker', 5000);
                } else {
                    Flash.create('danger', 'Er is een probleem opgetreden: ' + response.message
                            + '. Blijft het probleem zich voordoen, stuur ons dan een bericht', 0);
                }
            }
        });
    }
    vm.redirectToLogin = function () {
        $location.path('/signin');
    }
};

