'use strict';
var appSignin = angular.module('signIn', [
	  'ngStorage',
	  'base64',
	  'core'
]);

//appSignin.config(function($httpProvider, $base64) {
//    var auth = $base64.encode("admin@klusbib.be:test");
//    $httpProvider.defaults.headers.common['Authorization'] = 'Basic ' + auth;
//})
