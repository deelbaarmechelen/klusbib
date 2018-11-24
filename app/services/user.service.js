// (function () {
//     'use strict';
//
//     angular
//         .module('toollibApp')
//         .factory('UserService', UserService);

    UserService.$inject = ['$http', '__env'];
    export default function UserService($http, __env) {
        var service = {};

        service.GetAll = GetAll;
        service.GetAllOrderBy = GetAllOrderBy;
        service.GetById = GetById;
        service.GetByUsername = GetByUsername;
        service.GetByEmail = GetByEmail;
        service.Create = Create;
        service.Update = Update;
        service.Delete = Delete;

        return service;

        function GetAll() {
            return $http.get(__env.apiUrl + '/users?_perPage=1000').then(handleSuccess, handleError);
        }

        function GetAllOrderBy(sortfield, direction) {
            return $http.get(__env.apiUrl + '/users?_perPage=1000&_sortField=' + sortfield + '&_sortDir=' + direction)
            	.then(handleSuccess, handleError);
        }
        function GetById(id) {
            return $http.get(__env.apiUrl + '/users/' + id).then(handleSuccess, handleError);
        }
        function GetByEmail(email, token) {
            var config = {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            }
            return $http.get(__env.apiUrl + '/users?email=' + email,config).then(handleSuccess, handleError);
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
        }

        function Update(user) {
            return $http.put(__env.apiUrl + '/users/' + user.user_id, user)
        		.then(handleSuccess, handleError);
        }

        function Delete(id) {
            return $http.delete(__env.apiUrl + '/users/' + id)
            	.then(handleSuccess, handleError);
        }

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
            if (status == 400) {
                message = 'Foutieve data (' + data + ')';
            }
            if (status == 401) {
            	message = 'Geen toegang. Gelieve eerst (opnieuw) in te loggen (' + data.error.message + ')';
            }
            if (status == 409) {
            	message = 'Conflict met een bestaande gebruiker (' + data.error.message + ')';
            }
            console.log(message);
            return { 'success': false, 'message': message, 'status': status };
        }
    };

// })();
