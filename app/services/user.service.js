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
            return $http.get(__env.apiUrl + '/users').then(handleSuccess, handleError('Error getting all users'));
        }

        function GetById(id) {
            return $http.get(__env.apiUrl + '/users/' + id).then(handleSuccess, handleError('Error getting user by id'));
        }

        function GetByUsername(username) {
            return $http.get(__env.apiUrl + '/users/' + username).then(handleSuccess, handleError('Error getting user by username'));
        }

        function Create(user, token) {
        	console.log('User data: ' + JSON.stringify(user));
        	var config = { 
        			headers: {
        				'Authorization': 'Bearer ' + token
        			}
            }
            return $http.post(__env.apiUrl + '/users', user, config).then(handleSuccess, handleError('Error creating user'));
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
            return $http.put(__env.apiUrl + '/users/' + user.id, user).then(handleSuccess, handleError('Error updating user'));
        }

        function Delete(id) {
            return $http.delete(__env.apiUrl + '/users/' + id).then(handleSuccess, handleError('Error deleting user'));
        }

        // private functions

        function handleSuccess(res) {
            return res.data;
        }

        function handleError(error) {
            return function () {
                return { success: false, message: error };
            };
        }
    }

})();
