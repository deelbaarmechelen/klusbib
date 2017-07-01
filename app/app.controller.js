(function() {
	angular.module('toollibApp').controller('toollibController', ['$scope', 'User', function ToollibController($scope, User){
		$scope.user = User.get();
		$scope.logout = function () {
			User.update(null);
		}
	}]);
}());