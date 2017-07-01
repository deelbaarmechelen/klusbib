// This file should handle routes configuration
//(function() {

angular.
  module('webApp').
  config(['$locationProvider', '$routeProvider',
    function config($locationProvider, $routeProvider) {
      $locationProvider.hashPrefix('!');

      $routeProvider.
      	when('/signin', {
          template: '<sign-in></sign-in>'
      	}).
        when('/profile/:userId', {
            template: '<my-profile></my-profile>'
          }).
        otherwise('/');
    }
  ]);

//}());
