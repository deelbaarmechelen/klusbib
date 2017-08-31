angular.
  module('myProfile').
  component('myProfile', {
    templateUrl: '/app/components/my-profile/my-profile.template.html',
    controller: ['$http', '$routeParams', '__env', 'ReservationService','$location','Flash',
      function MyProfileController($http, $routeParams, __env, ReservationService, $location, Flash) {
          var self = this;
          self.reservations = [];
          $http.get(__env.apiUrl + '/users/'+ $routeParams.userId).then(function(response) {
  	        self.user = response.data;
  	        self.reservations = filterFutureReservations(self.user.reservations);
  	        translateReservations(self.reservations);
          }, function(response) {
        	  console.log('Error in loading user data: ' + JSON.stringify(response.data));
        	  if (response.status == 401) {
        		  $location.path('/signin');
        	  }
        	  var id = Flash.create('danger', 
        			  'Er is een probleem opgetreden bij het laden van de gebruikersgegevens. Probeer later opnieuw', 5000);
          });
          
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
    ]
  });