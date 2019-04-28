import angular from 'angular';
import coreUtils from './core.js';
import 'ngstorage';

export default angular.module('core', ['ngStorage']).factory('User',coreUtils).name;