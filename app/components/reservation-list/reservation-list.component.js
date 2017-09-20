angular.module('reservationList').component('reservationList', {
	templateUrl : '/app/components/reservation-list/reservation-list.template.html',
	controller :
	[ '$http', '$routeParams', 'ReservationService', 'UserService', 'Flash','__env',
		function ReservationListController($http, $routeParams, ReservationService, UserService, Flash,__env) {

		var self = this;
		$http.get(__env.apiUrl + '/reservations?_perPage=100').then(function(response) {
	        self.reservations = response.data;
	      });
        self.user = UserService.GetById(self.userId).then(function(response) {
        	if (response.success && response.message.role == "admin") {
        		self.showFunctions = true;
        	}
        });
        self.showFunctions = false;
        self.canBeConfirmed = function (reservation) {
        	if (reservation.state == "REQUESTED") {
        		return true;
        	}
        	return false;
        }
		this.confirmReservation = function (reservation, index) {
			reservation.state = "CONFIRMED";
			ReservationService.Update(reservation).then(function(response) {
				if (response.success) {
					var id = Flash.create('success', 'Reservatie bevestigd', 5000);
				} else {
					var id = Flash.create('danger', 'Reservatie bevestiging mislukt', 5000);
				}
			})
		}
		this.newReservation = function () {
			alert ('not yet implemented!');
		}
		this.deleteReservation = function (reservationId, index) {
			ReservationService.Delete(reservationId).then(function(response) {
				if (response.success) {
					var id = Flash.create('success', 'Reservatie verwijderd', 5000);
				} else {
					var id = Flash.create('danger', 'Reservatie verwijderen mislukt', 5000);
				}
			});
			
		}


	} ]
});