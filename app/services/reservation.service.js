(function () {
    'use strict';

    angular
        .module('toollibApp')
        .factory('ReservationService', ReservationService);

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

    ReservationService.$inject = ['$http', '__env', '$localStorage'];
    function ReservationService($http, __env, $localStorage) {
        var service = {};

        service.GetAll = GetAll;
        service.GetAllByPage = GetAllByPage;
//        service.GetById = GetById;
        service.Create = Create;
        service.Extend = Extend;
        service.Cancel = Cancel;
        service.Update = Update;
        service.Delete = Delete;

        return service;

        function GetAll() {
            return $http.get(__env.apiUrl + '/reservations').then(handleSuccess, handleError);
        }
        function GetAllByPage(page, pageSize) {
            return $http.get(__env.apiUrl + '/reservations?_perPage='+pageSize).then(handleSuccess, handleError);
        }
//
//        function GetById(id) {
//            return $http.get(__env.apiUrl + '/reservations/' + id).then(handleSuccess, handleError('Error getting reservation by id'));
//        }

        function Create(userId, toolId, startDate, endDate, type, state) {
      	    var reservation = {'user_id' : userId, 'tool_id' : toolId, 'title' : 'Reservatie',
      	    		'state' : state, 'type' : type, 
      	    		'startsAt' : moment(startDate).format('YYYY-MM-DD'), 'endsAt' : moment(endDate).format('YYYY-MM-DD')};
      	  	console.log('Reservation data: ' + JSON.stringify(reservation));
        	var config = { 
        			headers: {
        				'Authorization': 'Bearer ' + $localStorage.token
        			}
            }
            return $http.post(__env.apiUrl + '/reservations', reservation, config)
            	.then(handleSuccess, handleError);
        }

        function Extend(reservation) {
        	
        }
        function Cancel(reservation) {
        	// FIXME: cancel updates state or triggers delete instead?
        	reservation.state = 'CANCELLED';
        	return Update(reservation);
        	
        }
        function Update(reservation) {
            return $http.put(__env.apiUrl + '/reservations/' + reservation.reservation_id, reservation)
            	.then(handleSuccess, handleError);
        }

        function Delete(id) {
            return $http.delete(__env.apiUrl + '/reservations/' + id).then(handleSuccess, handleError);
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
            if (status == 401) {
            	message = 'Geen toegang. Gelieve eerst (opnieuw) in te loggen (' + data.message + ')';
            }
            console.log(message);
            return { success: false, message: message };
        }
    }

})();
