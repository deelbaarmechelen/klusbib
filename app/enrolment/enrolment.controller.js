(function () {
    'use strict';

    angular
        .module('toollibApp')
        .controller('EnrolmentController', EnrolmentController);
    EnrolmentController.$inject = ['TokenService', 'UserService','Flash', 'AuthService', '$location'];

    function EnrolmentController(TokenService, UserService, Flash, AuthService, $location) {
        var vm = this;

//        (function initController() {
        	// Add initialisation
//        })();
        vm.init = function () {
            var params = $location.search();
            vm.email = params.email;
        };
        vm.enrolment = function () {
        	console.log('start enrolment for user ' + JSON.stringify(vm.user));
        	var token = TokenService.GetGuestToken(success);
        	
            function success(res) {
            	console.log('token for guest: ' + JSON.stringify(res.data.token));
            	vm.user.role = 'member';
                UserService.Create(vm.user, res.data.token)
                	.then(function (response) {
                	if (response.success) {
                		// TODO: send confirmation email to user (+ email address verification?)
                		var id = Flash.create('success', 'Inschrijving succesvol ingediend', 5000);
                	} else {
                		if (response.status == 409) {
                		    // a user with that email already exists
                            var id = Flash.create('warning', 'Gebruiker reeds ingeschreven. Log in om je gegevens na te kijken en/of laat een nieuwe bevestiging versturen', 0);
                            $location.path('/reset-pwd').search({email: vm.user.email});
                            return;
                        }
                		vm.dataLoading = false;
                		console.log("enrolment problem: " + response.message);
                		var id = Flash.create('danger', 'Inschrijving mislukt: ' + response.message 
                				+ '. Blijft het probleem zich voordoen, stuur ons dan een bericht', 0);
                	}
                });
            }

        };
        vm.resetPwd = function() {
        	AuthService.resetPwd(this.email, function () {
				Flash.create('success', 'Paswoord reset aangevraagd: check je mailbox', 5000);
			} , function () {
				Flash.create('danger', 'Er is een probleem opgetreden bij je paswoord reset aanvraag,'
						+ ' is het ingegeven email adres correct?', 5000);
			})
        }
        vm.resendConfirmation = function() {
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
    }

})();
