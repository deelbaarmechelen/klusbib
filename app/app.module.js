// import Icon16 from './favicon-16x16.png';
// import Icon32 from './favicon-32x32.png';

//import 'moment';
import moment from 'moment';
import angular from 'angular';
require('angular-moment');
import uirouter from 'angular-ui-router';
import 'oclazyload';
import cssProvider from 'angular-css';
import ngFlash from 'angular-flash-alert';
import 'angular-flash-alert/dist/angular-flash.min.css';
import 'angular-simple-logger';
// import nemLogging from 'angular-simple-logger';
import 'ui-leaflet';
import 'ng-file-upload';
import 'angular-loading-bar';

import envConfig from './app.env.js';
import routing from './app.config.js';
import navigation from './components/navigation/navigation.module.js';
import signIn from './components/sign-in/sign-in.module.js';
import setPassword from './components/set-pwd/set-pwd.module';
import consumerList from './components/consumer-list/consumer-list.module.js';
import myProfile from './components/my-profile/my-profile.module.js';
import reservationList from './components/reservation-list/reservation-list.module.js';
import toolAdmin from './components/tool-admin/tool-admin.module.js';
import userAdmin from './components/user-admin/user-admin.module.js';

import AuthService from './services/auth.service.js';
import TokenService from './services/token.service.js';
import UserService from './services/user.service.js';
import EnrolmentService from './services/enrolment.service.js';
import ToolService from './services/tool.service.js';
import ReservationService from './services/reservation.service.js';
import DeliveryService from './services/delivery.service.js';
import LendingService from './services/lending.service.js';

import './home/css/app.css';
import './home/css/creative.css';
import './static/css/inventory.css';

var env = {};
if(window){
    envConfig(window);
    env = angular.merge({}, window.__env)
}

const MODULE_NAME = 'toollibApp';

var app = angular.module(MODULE_NAME, ['oc.lazyLoad',
    uirouter,
    ngFlash,
	cssProvider,
    'angularMoment',
    'ui-leaflet',
    'ngFileUpload',
    'angular-loading-bar',
    navigation,
    signIn,
    setPassword,
    consumerList,
    myProfile,
	reservationList,
    toolAdmin,
    userAdmin
//	'enrolment'
]);
//Register environment in AngularJS as constant
app.constant('__env', env);
app.constant('moment', require('moment'));

app.config(routing);

app.controller('toollibController', ['$scope', 'User', function ToollibController($scope, User){
        $scope.user = User.get();
        $scope.logout = function () {
            User.update(null);
        }
}]);
app.service('ToolService', ToolService);
app.factory('UserService', UserService);
app.service('EnrolmentService', EnrolmentService);
app.factory('TokenService', TokenService);
app.factory('AuthService', AuthService);
app.service('ReservationService', ReservationService);
app.service('LendingService', LendingService);
app.service('DeliveryService', DeliveryService);

app.directive('focusOnCondition', ['$timeout',
    function ($timeout) {
        var checkDirectivePrerequisites = function (attrs) {
            if (!attrs.focusOnCondition && attrs.focusOnCondition != "") {
                throw "FocusOnCondition missing attribute to evaluate";
            }
        }

        return {
            restrict: "A",
            link: function (scope, element, attrs, ctrls) {
                checkDirectivePrerequisites(attrs);

                scope.$watch(attrs.focusOnCondition, function (currentValue, lastValue) {
                    if(currentValue == true) {
                        $timeout(function () {
                            element[0].focus();
                        });
                    }
                });
            }
        };
    }
]);
// use defaultErrorHandler to modify default error handling behaviour e.g. suppress superseded transition error
// The built-in defaultErrorHandler prints the error to the console
// app.run(function($state) {
//     // window.myAppErrorLog = [];
//     $state.defaultErrorHandler(function(error) {
//         // This is a naive example of how to silence the default error handler.
//         // window.myAppErrorLog.push(error);
//
//         console.error(error.message + ' ' + error.);
//     });
// })

export default MODULE_NAME;