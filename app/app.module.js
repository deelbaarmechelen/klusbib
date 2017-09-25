'use strict';

var env = {};

//Import variables if present (from env.js)
if(window){  
Object.assign(env, window.__env);
}

var app = angular.module('toollibApp', [
	'ui.router',
	'angularCSS',
	'uiGmapgoogle-maps',
	'navigation',
	'signIn', 
	'toolList', 
	'toolDetail',
	'consumerList',
	'myProfile',
	'reservationList',
	'volunteerCalendar'
//	'enrolment'
]);

//Register environment in AngularJS as constant
app.constant('__env', env);
