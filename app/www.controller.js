(function() {
	angular.module('webApp').controller('webController', ['$scope', function WebController($scope){
		$scope.test = 'test123';
		$scope.menuItems = [
			{'label': 'Over ons', 'href': '#about'}, 
			{'label': 'Waar', 'href': '#where'},
			{'label': 'Contact', 'href': '#contact'},
			{'label': 'FAQ', 'href': '#faq'}
		];
	}]);
}());