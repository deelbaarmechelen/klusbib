import angular from 'angular';
import routing from "./home.config.js";
import HomeController from "./home.controller";

const MODULE_NAME = 'home';
export const HOME_MODULE = angular.module(MODULE_NAME, []);

HOME_MODULE.config(routing);
HOME_MODULE.controller('HomeController', HomeController);
export default HOME_MODULE.name;
