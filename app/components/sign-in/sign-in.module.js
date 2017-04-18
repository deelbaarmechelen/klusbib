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

    function urlBase64Decode(str) {
        var output = str.replace('-', '+').replace('_', '/');
        switch (output.length % 4) {
            case 0:
                break;
            case 2:
                output += '==';
                break;
            case 3:
                output += '=';
                break;
            default:
                throw 'Illegal base64url string!';
        }
        return window.atob(output);
    }
    
    function getClaimsFromToken() {
        var token = $localStorage.token;
        var user = {};
        if (typeof token !== 'undefined') {
            var encoded = token.split('.')[1];
            user = JSON.parse(urlBase64Decode(encoded));
        }
        return user;
    }

    var tokenClaims = getClaimsFromToken();
    
    return {
        signin: function (login, password, success, error) {
        	var auth = btoa(login + ":" + password), 
            	headers = {"Authorization": "Basic " + auth};
        	var data = '["tools.all", "users.all", "reservations.all", "consumers.all"]';
            $http.post(__env.apiUrl + '/token', data, {headers: headers}).then(success,error)
        },
        signout: function (success) {
            delete $localStorage.token;
            success();
        },
        getTokenClaims: function () {
            return tokenClaims;
        }
    };
}
]);