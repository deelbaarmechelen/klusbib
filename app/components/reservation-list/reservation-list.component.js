angular.module('reservationList').component('reservationList', {
	templateUrl : '/components/reservation-list/reservation-list.template.html',
	controller :
	[ '$http', 'ReservationService', 'UserService', 'ToolService', 'Flash','__env','$state',
		function ReservationListController($http, ReservationService, UserService, ToolService, Flash,__env, $state) {

		var self = this;
		ReservationService.GetAllByPage(1, 100).then(function (response) {
			if (response.success ) {
				self.reservations = response.message;
			} else {
				Flash.create('danger', 'Er ging iets mis: ' + response.message, 5000);
			}
		});
		self.user = UserService.GetById(self.userId).then(function(response) {
        		if (response.success && response.message.role == "admin") {
        			self.showFunctions = true;
        		}
        	});
		UserService.GetAllOrderBy('firstname', 'asc').then(function(response) {
			if (response.success) {
    				self.users = response.message;
    		}
		});
		ToolService.GetAllOrderBy('code', 'asc').then(function(response) {
			if (response.success) {
    			self.tools = response.message;
    		}
		});
        self.showFunctions = false;
        self.canBeConfirmed = function (reservation) {
        	if (reservation.state == "REQUESTED") {
        		return true;
        	}
        	return false;
        }
        self.canBeExtended = function (reservation) {
        	if (reservation.state != "CANCELLED") {
        		return true;
        	}
        	return false;
        }
        self.canBeCancelled = function (reservation) {
        	if (reservation.state != "CANCELLED") {
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
					$state.reload();
				}
			})
		}
		this.extendReservation = function (reservation, index) {
			var endDate = moment(reservation.endsAt, 'YYYY-MM-DD');
			endDate.add(7, 'days').calendar();
			reservation.endsAt = endDate.format('YYYY-MM-DD');
			ReservationService.Update(reservation).then(function(response) {
				if (response.success) {
					var id = Flash.create('success', 'Reservatie verlengd', 5000);
				} else {
					var id = Flash.create('danger', 'Reservatie verlengen mislukt', 5000);
					$state.reload();
				}
			})
		}
		this.cancelReservation = function (reservation, index) {
			reservation.state = "CANCELLED";
			ReservationService.Update(reservation).then(function(response) {
				if (response.success) {
					var id = Flash.create('success', 'Reservatie geannuleerd', 5000);
				} else {
					var id = Flash.create('danger', 'Reservatie annulatie mislukt', 5000);
					$state.reload();
				}
			})
		}
		this.editReservation = function (reservation,index) {
			ReservationService.Update(reservation).then(function(response) {
				if (response.success) {
					var id = Flash.create('success', 'Reservatie gewijzigd', 5000);
				} else {
					var id = Flash.create('danger', 'Reservatie update mislukt', 5000);
				}
				$state.reload();
			})
		}
		this.newReservation = function (userId, toolId, startDate, endDate, type, state, comment) {
			console.log('newReservation userId, toolId, startDate, endDate, type, state, comment' 
					+userId + toolId + startDate + endDate + type + state + comment);
			ReservationService.Create(userId, toolId, startDate, endDate, type, state, comment).then(function(response) {
				if (response.success) {
					var id = Flash.create('success', 'Reservatie toegevoegd', 5000);
					$state.reload();
				} else {
					var id = Flash.create('danger', 'Reservatie toevoegen mislukt', 5000);
				}
			})
		}
		this.deleteReservation = function (reservationId, index) {
			ReservationService.Delete(reservationId).then(function(response) {
				if (response.success) {
					var id = Flash.create('success', 'Reservatie verwijderd', 5000);
					$state.reload();
				} else {
					var id = Flash.create('danger', 'Reservatie verwijderen mislukt', 5000);
				}
			});
			
		}
		
		this.getUserName = function (userId) {
			function isUserId(userId) {
				return function(user) {
					return user.user_id === userId;
				}
			}
			if (Object.prototype.toString.call( self.users ) !== '[object Array]') {
				return "unknown";
			}
			var user = self.users.filter(isUserId(userId));
//			console.log(JSON.stringify(user));
			return user[0].firstname + ' ' + user[0].lastname;
		}
		this.getToolNameAndCode = function (toolId) {
			function isToolId(toolId) {
				return function(tool) {
					return tool.tool_id === toolId;
				}
			}
			if (Object.prototype.toString.call( self.tools) !== '[object Array]') {
				return "unknown";
			}
			var tool = self.tools.filter(isToolId(toolId));
//			console.log(JSON.stringify(tool));
			return tool[0].code + ' ' + tool[0].name;
		}
		this.reservationTypes = [
		      {id: 'maintenance', name: 'Onderhoud'},
		      {id: 'loan', name: 'Ontlening'},
		      {id: 'reservations', name: 'Reservatie'}
		];
		this.reservationStates = [
		      {id: 'REQUESTED', name: 'Aanvraag'},
		      {id: 'CONFIRMED', name: 'Bevestigd'},
		      {id: 'CANCELLED', name: 'Annulatie'}
		];
	} ]
});