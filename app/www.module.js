'use strict';

var env = {};

//Import variables if present (from env.js)
if(window){  
Object.assign(env, window.__env);
}

var app = angular.module('webApp', [
	'ngRoute',
	'navigation',
	'signIn', 
	'myProfile'
]);

//Register environment in AngularJS as constant
app.constant('__env', env);
