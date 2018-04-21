// import Icon16 from './favicon-16x16.png';
// import Icon32 from './favicon-32x32.png';

import 'moment';
import _ from '@bower_components/lodash';
// import '@bower_components/lodash';
// import '@bower_components/interact';

import angular from 'angular';
import uirouter from 'angular-ui-router';
import 'oclazyload';
import cssProvider from 'angular-css';
import ngFlash from 'angular-flash-alert';
import 'angular-flash-alert/dist/angular-flash.min.css';
import 'angular-simple-logger';
// import nemLogging from 'angular-simple-logger';
import 'angular-google-maps';

import envConfig from './app.env.js';
import routing from './app.config.js';
import navigation from './components/navigation/navigation.module.js';
import signIn from './components/sign-in/sign-in.module.js';
import consumerList from './components/consumer-list/consumer-list.module.js';
import myProfile from './components/my-profile/my-profile.module.js';
import reservationList from './components/reservation-list/reservation-list.module.js';

import AuthService from './services/auth.service.js';
import TokenService from './services/token.service.js';
import UserService from './services/user.service.js';
import ToolService from './services/tool.service.js';
import ReservationService from './services/reservation.service.js';

import './home/css/app.css';
import './home/css/creative.css';
import EnrolmentController from './enrolment/enrolment.controller.js';

var env = {};
if(window){
    envConfig(window);
    env = angular.merge({}, window.__env)
}

const MODULE_NAME = 'toollibApp';


var app = angular.module(MODULE_NAME, ['oc.lazyLoad',
    uirouter,
    // uibootstrap,
    ngFlash,
	cssProvider,
	'uiGmapgoogle-maps',
    navigation,
    signIn,
    consumerList,
    myProfile,
	reservationList
//	'enrolment'
]);
//Register environment in AngularJS as constant
app.constant('__env', env);

app.config(routing);

app.config(['uiGmapGoogleMapApiProvider',function(uiGmapGoogleMapApiProvider) {
    uiGmapGoogleMapApiProvider.configure({
        key: 'AIzaSyDI8xAPjlP8imcKL5eyONF2AT2ZJbSE88M',
        v: '3.30', //defaults to latest 3.X anyhow ( 2.4.1??)
        libraries: 'weather,geometry,visualization'
    });
}])

app.controller('toollibController', ['$scope', 'User', function ToollibController($scope, User){
        $scope.user = User.get();
        $scope.logout = function () {
            User.update(null);
        }
}]);
app.service('ToolService', ToolService);
app.factory('UserService', UserService);
app.controller('EnrolmentController', EnrolmentController);
app.factory('TokenService', TokenService);
app.factory('AuthService', AuthService);
app.service('ReservationService', ReservationService);

export default MODULE_NAME;