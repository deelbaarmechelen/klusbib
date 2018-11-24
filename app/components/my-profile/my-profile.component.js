// angular.
//   module('myProfile').
//   component('myProfile', {
// 	bindings: { user: '<' },
//     templateUrl: '/components/my-profile/my-profile.template.html',
//     controller: ['$http', '__env', 'UserService', 'ReservationService','$location','Flash',
MyProfileController.$inject = ['$http', '__env', 'UserService', 'ReservationService','$location','Flash'];
export default function MyProfileController($http, __env, UserService, ReservationService, $location, Flash) {
        var self = this;
        this.$onChanges = function(changesObj) {
          if (changesObj.user && changesObj.user.currentValue) {
              if (changesObj.user.currentValue.success) {
                  self.user = changesObj.user.currentValue.message;
                  self.reservations = filterFutureReservations(self.user.reservations);
                  translateReservations(self.reservations);
              } else {
                  if (changesObj.user.currentValue.status == 401) {
                      $location.path('/signin');
                  }
                  Flash.create('danger',
                          'Er is een probleem opgetreden bij het laden van de gebruikersgegevens. Probeer later opnieuw', 5000);
              }
          }
        }
        self.reservationsEnabled = false;
        function isAdmin(user) {
          if (user.role === "admin" && user.state === "ACTIVE") {
              return true;
          }
          return false;
        }
        self.showAdminLinks = function () {
            return isAdmin(self.user);
        }
        self.showReservationsLink = self.showAdminLinks && self.reservationsEnabled;

        self.updateUser = function() {
          var userToUpdate = {"user_id":this.user.user_id,
                  "firstname":this.user.firstname,
                  "lastname":this.user.lastname,
                  "email":this.user.email,
                  "address":this.user.address,
                  "postal_code":this.user.postal_code,
                  "city":this.user.city,
                  "phone":this.user.phone,
                  "mobile":this.user.mobile,
                  "registration_number":this.user.registration_number,
                  }
          console.log("updating user " + JSON.stringify(userToUpdate));

          UserService.Update(userToUpdate).then(function (response) {
                if (response.success) {
                    var id = Flash.create('success', 'Aanpassingen bewaard', 5000);
                } else {
                    console.log(response.message);
                    var id = Flash.create('danger', response.message, 5000);
                }
          });
        }
//          self.reservations = [];
//          self.reservations = filterFutureReservations(self.user.reservations);
//          translateReservations(self.reservations);
//          $http.get(__env.apiUrl + '/users/'+ $routeParams.userId).then(function(response) {
//  	        self.user = response.data;
//  	        self.reservations = filterFutureReservations(self.user.reservations);
//  	        translateReservations(self.reservations);
//          }, function(response) {
//        	  console.log('Error in loading user data: ' + JSON.stringify(response.data));
//        	  if (response.status == 401) {
//        		  $location.path('/signin');
//        	  }
//        	  var id = Flash.create('danger', 
//        			  'Er is een probleem opgetreden bij het laden van de gebruikersgegevens. Probeer later opnieuw', 5000);
//          });
          
          self.extend = function (item) {
        	  alert('extend not yet implemented');
          }
          self.cancel = function (item) {
        	  console.log('cancelling reservation ' + JSON.stringify(item));
        	  // TODO: allow to specify start date
        	  ReservationService.Cancel(item)
	          	.then(function (response) {
		          	if (response.success) {
		          		translateReservationState(item);
		          		var id = Flash.create('success', 'Reservatie geannuleerd', 5000);
		          	} else {
		          		console.log(response.message);
		                var id = Flash.create('danger', response.message, 5000);
		          	}
	          });
          }
          
          var filterFutureReservations = function (items) {
        	  if(!angular.isArray(items)) return [];

        	  var currentDate = new Date();
        	  currentDate.setHours(0,0,0,0); //Just normalize the time offset, since item is just date.

        	  return items.filter(function(item){
        	      return new Date(item.endsAt) >= currentDate;
        	    });
          }
          var translateReservations = function (items) {
        	  if(!angular.isArray(items)) return [];

        	  return items.map(translateReservationState); 
          }
          var translateReservationState = function(item){
    		  if (item.state == 'REQUESTED') {
    			  item.state = 'Aangevraagd';
    		  }
    		  if (item.state == 'CONFIRMED') {
    			  item.state = 'Bevestigd';
    		  }
    		  if (item.state == 'CANCELLED') {
    			  item.state = 'Annulatie';
    		  }
    		  return item;
          }
      }