(function () {
    'use strict';

    angular
        .module('toollibApp')
        .controller('EnrolmentController', EnrolmentController);
    EnrolmentController.$inject = ['TokenService', 'UserService','Flash'];

    function EnrolmentController(TokenService, UserService, Flash) {
        var vm = this;

//        (function initController() {
        	// Add initialisation
//        })();
        
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
                		vm.dataLoading = false;
                		console.log("enrolment problem: " + response.message);
                		var id = Flash.create('danger', 'Inschrijving mislukt: ' + response.message 
                				+ '. Blijft het probleem zich voordoen, stuur ons dan een bericht', 0);
                	}
                });
            }

        };
    }

})();