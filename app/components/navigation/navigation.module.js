// import './navigation.component.js';
import angular from 'angular';
import bootstrapAffix from 'angular-bootstrap-affix';
import uibootstrap from 'angular-ui-bootstrap';
import coreUtils from './../../core/core.module.js';
import navigationController from './navigation.component';
import ngResource from "angular-resource";

var appNavigation = angular.module('navigation', [
    bootstrapAffix, uibootstrap, coreUtils
]);

appNavigation.component('navigation', {
    template : require('./navigation.template.html').default,
    controller : navigationController,
    bindings: {
        items: '<items', // or items: '<' it depends on what binding you need
        inverse: '<inverse', // if true, use a darker style (default=false)
        transparant: '<transparant', // if true, text/image behind navigation is assumed visible
        admin: '<admin' // true when admin navigation controls should be visible
    }
});
export default appNavigation.name;

// angular.module('navigation', [bootstrapAffix, uibootstrap, coreUtils])
// 	.component('navigation', {
//     template : require('./navigation.template.html'),
//     controller : navigationController,
//     bindings: {
//         items: '=items', // or items: '<' it depends on what binding you need
//         inverse: '=inverse', // if true, use a darker style (default=false)
//         transparant: '=transparant' // if true, text/image behind navigation is assumed visible
//     }
// }).name;
