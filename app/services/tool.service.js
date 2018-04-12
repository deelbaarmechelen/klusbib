// (function () {
//     'use strict';
//
//     angular
//         .module('toollibApp')
//         .factory('ToolService', ToolService);

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
    export default function ToolService($http, __env) {
        var service = {};
        var defaultPageSize = 100;

        service.GetAll = GetAll;
        service.GetAllOrderBy = GetAllOrderBy;
        service.GetById = GetById;
        service.GetByUsername = GetByUsername;
        service.GetByCategoryOrderBy = GetByCategoryOrderBy;
        service.Create = Create;
        service.Update = Update;
        service.Delete = Delete;

        return service;

        function GetAll(page, perPage) {
            page = typeof page !== 'undefined' ? page : 1;
            perPage = typeof perPage !== 'undefined' ? perPage : defaultPageSize;
            return $http.get(__env.apiUrl + '/tools?_page=' + page + '&_perPage=' + perPage).then(handleSuccess, handleError);
        }
        function GetAllOrderBy(page, perPage, sortField, direction) {
            page = typeof page !== 'undefined' ? page : 1;
            perPage = typeof perPage !== 'undefined' ? perPage : defaultPageSize;
            sortField = typeof sortField !== 'undefined' ? sortField : 'code';
            direction = typeof direction !== 'undefined' ? direction : 'asc';
            return $http.get(__env.apiUrl + '/tools?_page=' + page + '&_perPage=' + perPage + '&_sortField=' + sortField + '&_sortDir=' + direction)
            	.then(handleSuccess, handleError);
        }
        function GetByCategoryOrderBy(category, page, perPage, sortField, direction) {
            page = typeof page !== 'undefined' ? page : 1;
            perPage = typeof perPage !== 'undefined' ? perPage : defaultPageSize;
            sortField = typeof sortField !== 'undefined' ? sortField : 'code';
            direction = typeof direction !== 'undefined' ? direction : 'asc';
            return $http.get(__env.apiUrl + '/tools?category=' + category + '&_page=' + page + '&_perPage=' + perPage + '&_sortField=' + sortField + '&_sortDir=' + direction)
                .then(handleSuccess, handleError);
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
            var totalCount = parseInt(response.headers('X-Total-Count')) || 0;
            return { success: true, message: response.data, totalCount: totalCount };
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
    };