(function () {
    'use strict';

    angular
        .module('toollibApp')
        .factory('UserService', UserService);

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

    UserService.$inject = ['$http', '__env'];
    function UserService($http, __env) {
        var service = {};

        service.GetAll = GetAll;
        service.GetById = GetById;
        service.GetByUsername = GetByUsername;
        service.Create = Create;
        service.Update = Update;
        service.Delete = Delete;

        return service;

        function GetAll() {
            return $http.get(__env.apiUrl + '/users').then(handleSuccess, handleError);
        }

        function GetById(id) {
            return $http.get(__env.apiUrl + '/users/' + id).then(handleSuccess, handleError);
        }

        function GetByUsername(username) {
            return $http.get(__env.apiUrl + '/users/' + username).then(handleSuccess, handleError);
        }

        function Create(user, token) {
        	console.log('User data: ' + JSON.stringify(user));
        	var config = { 
        			headers: {
        				'Authorization': 'Bearer ' + token
        			}
            }
            return $http.post(__env.apiUrl + '/users', user, config)
            	.then(handleSuccess, handleError);
//            	.then(handleSuccess, handleError('Error creating user'));
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
            return $http.put(__env.apiUrl + '/users/' + user.id, user)
//            .then(handleSuccess, handleError('Error updating user'));
        		.then(handleSuccess, handleError);
        }

        function Delete(id) {
            return $http.delete(__env.apiUrl + '/users/' + id)
//            .then(handleSuccess, handleError('Error deleting user'));
            	.then(handleSuccess, handleError);
        }

        // private functions

        // private functions
        function handleSuccess(response) {
            return { success: true, message: response.data };;
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
            	message = 'Geen toegang. Gelieve eerst (opnieuw) in te loggen (' + data.error.message + ')';
            }
            if (status == 409) {
            	message = 'Conflict met een bestaande gebruiker (' + data.error.message + ')';
            }
            console.log(message);
            return { 'success': false, 'message': message, 'status': status };
        }
//        function handleSuccess(res) {
//            return res.data;
//        }
//
//        function handleError(error) {
//            return function () {
//                return { success: false, message: error };
//            };
//        }
    }

})();
