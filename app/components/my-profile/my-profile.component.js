angular.
  module('myProfile').
  component('myProfile', {
    templateUrl: '/app/components/my-profile/my-profile.template.html',
    controller: ['$http', '$routeParams', '__env', 
      function MyProfileController($http, $routeParams, __env) {
          var self = this;
          $http.get(__env.apiUrl + '/users/'+ $routeParams.userId).then(function(response) {
  	        self.user = response.data;
          });
          
          self.addReservation = function () {
        	alert ('not yet implemented');  
          };
        }
    ]
  });