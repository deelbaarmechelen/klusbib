import angular from 'angular';
import 'ngstorage';
import base64 from 'angular-base64';
import coreUtils from '../../core/core.module.js';

import signInFactory from './sign-in.factory.js';
import signInController from './sign-in.component.js';

export default angular.module('signIn', [
	'ngStorage',
    'base64',
    coreUtils
]).factory('Auth', signInFactory)
.component('signIn', {
    scope: true,
    template: require('./sign-in.template.html').default,
    controller: signInController
}).name;

//appSignin.config(function($httpProvider, $base64) {
//    var auth = $base64.encode("admin@klusbib.be:test");
//    $httpProvider.defaults.headers.common['Authorization'] = 'Basic ' + auth;
//})
