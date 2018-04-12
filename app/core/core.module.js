import angular from 'angular';
import coreUtils from './core.js';
import 'ngstorage';

// (function() {
//     'use strict';
//
//     angular.module('core', []);
// })();

export default angular.module('core', ['ngStorage']).factory('User',coreUtils).name;