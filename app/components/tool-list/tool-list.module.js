'use strict';
import angular from 'angular';
import ngResource from 'angular-resource';
import uibootstrap from 'angular-ui-bootstrap';
import ToolListController from './tool-list.component.js';

var appToolList = angular.module('toolList', [
//	  'ngRoute',
    ngResource,
    uibootstrap
//	  'ngStorage'
]);


appToolList.config(['$httpProvider', function ($httpProvider) {
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

appToolList.component('toolList', {
    bindings: { tools: '<', category: '<' , currentPage: '<', pageSize: '<', totalCount: '<'},
    template : require('./tool-list.template.html'),
    controller : ToolListController
});
export default appToolList.name;



