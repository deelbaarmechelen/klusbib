(function() {
    'use strict';

	angular.module('navigation').component('navigation', {
		templateUrl : '/app/components/navigation/navigation.template.html',
		controller :
		[ '$scope', 'User',
			function NavigationController($scope, User) {
//				this.menuItems = [
//					{'label': 'Over ons', 'href': '#about'}, 
//					{'label': 'Waar', 'href': '#where'},
//					{'label': 'Contact', 'href': '#contact'},
//					{'label': 'FAQ', 'href': '#faq'}
//				];
				$scope.user = User.get();
				$scope.logout = function () {
					User.update(null);
				}
			}
		],
        bindings: {
            items: '=items', // or items: '<' it depends on what binding you need
            inverse: '=inverse' // if true, use a darker style (default=false)
        }
	});
})();
