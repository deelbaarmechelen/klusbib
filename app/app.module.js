'use strict';

var env = {};

//Import variables if present (from env.js)
if(window){  
Object.assign(env, window.__env);
}

var app = angular.module('toollibApp', [
	'ngRoute',
	'signIn', 
	'toolList', 
	'toolDetail',
	'consumerList',
	'myProfile'
]);

//Register environment in AngularJS as constant
app.constant('__env', env);

app.controller('toollibController', ['$scope', 'User', function ToollibController($scope, User){
	$scope.user = User.get();
}]);

app.factory('User', function() {
	   var user = {id:null};
	   return {
	        update: function (userId) {
	        	user.id = userId;
	        },
	        get: function () {
	            return user;
	        },
	    };
});
