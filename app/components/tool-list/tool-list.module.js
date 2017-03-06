'use strict';
var appToolList = angular.module('toolList', [
	  'ngRoute',
	  'ngResource'
//	  'ngStorage'
]);

//appToolList.constant('urls', {
//    BASE: 'http://app.klusbib.be',
//    BASE_API: 'http://api.klusbib.be'
//})

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

//appToolList.factory('ToolQueryWithToken', ['$resource', '__env',
//    function($resource, __env){
//        return {
//            tools: function (token) {
//                return $resource(__env.apiUrl + '/tools', {}, {
//                    query: {
//                        method: 'GET',
//                        isArray:true,
//                        headers: {
//                            'Authorization': 'Bearer ' + token
//                        }
//                    }
//                });
//            },
//            login: function () {
//                return $resource(__env.apiUrl + '/token', {}, {
//                    login : {
//                        method: 'POST',
//                        isArray: false
//                    }
//                });
//            }
//    };
//}]);


