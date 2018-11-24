import PaymentService from "../services/payment.service";

EnrolmentController.$inject = ['TokenService', 'UserService','Flash', 'AuthService', '$location', '$window', '$state', 'PaymentService', 'moment'];

export default function EnrolmentController(TokenService, UserService, Flash, AuthService, $location, $window, $state, PaymentService, moment) {
    var vm = this;

    vm.profileLinkEnabled = true;
    vm.paymentLinkEnabled = false;
    vm.confirmLinkEnabled = false;

    vm.init = function () {
        var params = $location.search();
        vm.email = params.email;
    };
    vm.enrolment = function () {
        Flash.clear();
        console.log('start enrolment for user ' + JSON.stringify(vm.user));
        var token = TokenService.GetGuestToken(success);

        function success(res) {
            console.log('token for guest: ' + JSON.stringify(res.data.token));
            vm.user.role = 'member';
            UserService.Create(vm.user, res.data.token)
                .then(function (response) {
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
        $state.get('enrolment.confirm').data.payment_mode = vm.payment_mode;
        var userId = $state.current.data.user.user_id;
        var orderId = userId + '-' + moment().format('YYYYMMDDhhmmss');
        if (vm.payment_mode == 'TRANSFER') {
            // Manual transfer -> create payment (will trigger email with payment details)
            // and go directly to confirm page
            PaymentService.Create(vm.payment_mode, userId, orderId)
                .then(function (response) {
                    if (response.success) {
                        return $state.go('^.confirm', {orderId: response.message.orderId});
                    } else {
                        console.log("payment creation problem: " + response.message);
                        Flash.create('danger', 'Inschrijving mislukt: ' + response.message
                            + '. Blijft het probleem zich voordoen, stuur ons dan een bericht', 0);
                    }
                });
            return;
        }
        if (vm.payment_mode == 'MOLLIE') {
            var redirectUrl = $state.href('enrolment.confirm',{orderId: orderId}, {absolute: true});
            PaymentService.Create(vm.payment_mode, userId, orderId, redirectUrl)
                .then(function (response) {
                    if (response.success) {
                        $state.get('enrolment.confirm').data.orderId = response.message.orderId;
                        $window.location.href = response.message.checkoutUrl;
                    } else {
                        console.log("payment creation problem: " + response.message);
                        Flash.create('danger', 'Inschrijving mislukt: ' + response.message
                            + '. Blijft het probleem zich voordoen, stuur ons dan een bericht', 0);
                    }
                });
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

