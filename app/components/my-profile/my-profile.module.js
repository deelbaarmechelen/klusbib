import angular from 'angular';
import MyProfileController from './my-profile.component.js';

angular.module('myProfile', [
]);

angular.module('myProfile').config(['$httpProvider', function ($httpProvider) {
	$httpProvider.interceptors.push(['$q', '$localStorage', function ($q, $localStorage) {
        return {
            'request': function (config) {
                config.headers = config.headers || {};
                if ($localStorage.token) {
                    config.headers.Authorization = 'Bearer ' + $localStorage.token;
                }
                return config;
            },
            'responseError': function (response) {
                if (response.status === 401 || response.status === 403) {
//                    delete $localStorage.token;
//                    $location.path('/signin');
                }
                return $q.reject(response);
            }
        };
    }]);
}]);

angular.module('myProfile').
component('myProfile', {
    bindings: {user: '<'},
    template: require('./my-profile.template.html'),
    controller: MyProfileController
});
export default angular.module('myProfile').name;
