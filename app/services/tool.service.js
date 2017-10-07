(function () {
    'use strict';

    angular
        .module('toollibApp')
        .factory('ToolService', ToolService);

//    angular.module('toollibApp').config(['$httpProvider', function ($httpProvider) {
//    	$httpProvider.interceptors.push(['$q', '$localStorage', function ($q, $localStorage) {
//            return {
//                'request': function (config) {
//                    config.headers = config.headers || {};
//                    if ($localStorage.token) {
//                        config.headers.Authorization = 'Bearer ' + $localStorage.token;
//                    }
//                    return config;
//                }
//            };
//        }]);
//    }]);

    ToolService.$inject = ['$http', '__env'];
    function ToolService($http, __env) {
        var service = {};

        service.GetAll = GetAll;
        service.GetById = GetById;
        service.GetByUsername = GetByUsername;
        service.Create = Create;
        service.Update = Update;
        service.Delete = Delete;

        return service;

        function GetAll() {
        	// FIXME: support more than 100 items
            return $http.get(__env.apiUrl + '/tools?_perPage=100').then(handleSuccess, handleError);
        }

        function GetById(id) {
        	console.log ('called GetById for id ' + id);
            return $http.get(__env.apiUrl + '/tools/' + id).then(handleSuccess, handleError);
        }

        function GetByUsername(username) {
            return $http.get(__env.apiUrl + '/tools/' + username).then(handleSuccess, handleError);
        }

        function Create(user, token) {
        	console.log('User data: ' + JSON.stringify(user));
        	var config = { 
        			headers: {
        				'Authorization': 'Bearer ' + token
        			}
            }
            return $http.post(__env.apiUrl + '/tools', user, config)
            	.then(handleSuccess, handleError);
        }

//        users: function (token) {
//            return $resource('/api/users', {}, {
//                query: {
//                    method: 'GET',
//                    isArray:true,
//                    headers: {
//                        'Authorization': 'Bearer ' + token
//                    }
//                }
//            });
//        },
        
        function Update(user) {
            return $http.put(__env.apiUrl + '/tools/' + user.id, user)
        		.then(handleSuccess, handleError);
        }

        function Delete(id) {
            return $http.delete(__env.apiUrl + '/tools/' + id)
            	.then(handleSuccess, handleError);
        }

        // private functions

        // private functions
        function handleSuccess(response) {
            return { success: true, message: response.data };
//          return response.data;
        }

        // function (data, status, headers, config)??
        function handleError(response, error) {
            console.log(JSON.stringify(response));
        	var data = response.data;
            var status = response.status;
            var statusText = response.statusText;
            var headers = response.headers;
            var config = response.config;
            var message = 'Er ging iets mis, probeer later eens opnieuw';
            if (status == 401) {
            	message = 'Geen toegang. Gelieve eerst (opnieuw) in te loggen (' + data.message + ')';
            }
            console.log(message);
            return { success: false, message: message };
        }
    }

})();
