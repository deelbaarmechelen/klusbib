import angular from 'angular';
import ngResource from 'angular-resource';
import ReservationListController from './reservation-list.component.js';

let RESERVALTION_LIST = angular.module('reservationList', [
    ngResource
]);

RESERVALTION_LIST.config(['$httpProvider', function ($httpProvider) {
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

RESERVALTION_LIST.component('reservationList', {
    bindings: {user: '<'},
    template : require('./reservation-list.template.html').default,
    controller :ReservationListController
});
export {RESERVALTION_LIST};
//export default angular.module('reservationList').name;

