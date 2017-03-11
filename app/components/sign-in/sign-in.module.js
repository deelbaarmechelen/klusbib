'use strict';
var appSignin = angular.module('signIn', [
	  'ngStorage',
	  'base64'
]);

//appSignin.config(function($httpProvider, $base64) {
//    var auth = $base64.encode("admin@klusbib.be:test");
//    $httpProvider.defaults.headers.common['Authorization'] = 'Basic ' + auth;
//})
appSignin.factory('Auth', ['$http', '$localStorage', '__env',
	function ($http, $localStorage, __env) {

    return {
        signin: function (login, password, success, error) {
        	var auth = btoa(login + ":" + password), 
            	headers = {"Authorization": "Basic " + auth};
        	var data = '["tools.all", "users.all", "reservations.all"]';
            $http.post(__env.apiUrl + '/token', data, {headers: headers}).then(success,error)
        },
        signout: function (success) {
            delete $localStorage.token;
            success();
        },
    };
}
]);