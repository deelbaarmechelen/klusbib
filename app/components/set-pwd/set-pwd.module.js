"use strict";

import angular from 'angular';
import 'ngstorage';
import base64 from 'angular-base64';
import coreUtils from '../../core/core.module.js';

import SetPasswordController from './set-pwd.component.js';

export default angular.module('setPassword', [
	'ngStorage',
    'base64',
    coreUtils
])
.component('setPassword', {
    scope: true,
    template: require('./set-pwd.template.html'),
    controller: SetPasswordController
}).name;

