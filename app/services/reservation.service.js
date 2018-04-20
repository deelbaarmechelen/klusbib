    // export default function ReservationService($http, __env, $localStorage) {

export default class ReservationService {
    // static get $inject() { return ['$http', '__env', '$localStorage']; }
    constructor($http, __env, $localStorage){
            this.$http = $http;
            this.__env = __env;
            this.$localStorage = $localStorage;
        }

        GetAll() {
            return this.$http.get(this.__env.apiUrl + '/reservations').then(this.handleSuccess, this.handleError);
        }
        GetOpen() {
            return this.$http.get(this.__env.apiUrl + '/reservations?isOpen=true').then(this.handleSuccess, this.handleError);
        }
        GetAllByPage(page, pageSize) {
            return this.$http.get(this.__env.apiUrl + '/reservations?_perPage='+pageSize).then(this.handleSuccess, this.handleError);
        }
        GetOpenByPage(page, pageSize) {
            return this.$http.get(this.__env.apiUrl + '/reservations?isOpen=true&_perPage='+pageSize).then(this.handleSuccess, this.handleError);
        }
//
//        function GetById(id) {
//            return $http.get(__env.apiUrl + '/reservations/' + id).then(this.handleSuccess, this.handleError('Error getting reservation by id'));
//        }

        Create(userId, toolId, startDate, endDate, type, state, comment) {
      	    var reservation = {'user_id' : userId, 'tool_id' : toolId, 'title' : 'Reservatie',
      	    		'state' : state, 'type' : type, 'comment' : comment, 
      	    		'startsAt' : moment(startDate).format('YYYY-MM-DD'), 'endsAt' : moment(endDate).format('YYYY-MM-DD')};
      	  	console.log('Reservation data: ' + JSON.stringify(reservation));
        	var config = { 
        			headers: {
        				'Authorization': 'Bearer ' + $localStorage.token
        			}
            }
            return this.$http.post(this.__env.apiUrl + '/reservations', reservation, config)
            	.then(handleSuccess, handleError);
        }

        Extend(reservation) {
        	
        }
        Cancel(reservation) {
        	// FIXME: cancel updates state or triggers delete instead?
        	reservation.state = 'CANCELLED';
        	return this.Update(reservation);
        	
        }
        Update(reservation) {
            return this.$http.put(this.__env.apiUrl + '/reservations/' + reservation.reservation_id, reservation)
            	.then(this.handleSuccess, this.handleError);
        }

        Delete(id) {
            return this.$http.delete(this.__env.apiUrl + '/reservations/' + id).then(this.handleSuccess, this.handleError);
        }

        // private functions
        handleSuccess(response) {
            return { success: true, message: response.data };
        }

        // function (data, status, headers, config)??
        handleError(response, error) {
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

    ReservationService.$inject = ['$http', '__env', '$localStorage'];
