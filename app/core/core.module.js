import angular from 'angular';
import 'angular-jwt';
import coreUtils from './core.js';
import 'ngstorage';

export default angular.module('core', [
    'ngStorage',
    'angular-jwt'
]).factory('User',coreUtils).name;