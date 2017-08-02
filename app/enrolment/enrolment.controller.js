(function () {
    'use strict';

    angular
        .module('toollibApp')
        .controller('EnrolmentController', EnrolmentController);
    EnrolmentController.$inject = ['TokenService', 'UserService'];

    function EnrolmentController(TokenService, UserService) {
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
//                        FlashService.Success('Registration successful', true);
                	} else {
//                        FlashService.Error(response.message);
                		vm.dataLoading = false;
                	}
                });
            }

        };
    }

})();
