(function() {
    'use strict';

	angular.module('navigation').component('navigation', {
		templateUrl : '/app/components/navigation/navigation.template.html',
		controller :
		[ '$scope', 'User',
			function NavigationController($scope, User) {

				$scope.user = User.get();
				$scope.logout = function () {
					console.log('logging out user ' + JSON.stringify(User.get()));
					User.logout();
				}
			}
		],
        bindings: {
            items: '=items', // or items: '<' it depends on what binding you need
            inverse: '=inverse', // if true, use a darker style (default=false)
            transparant: '=transparant' // if true, text/image behind navigation is assumed visible 
        }
	});
})();
