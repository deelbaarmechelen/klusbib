// import './navigation.component.js';
import angular from 'angular';
import bootstrapAffix from 'angular-bootstrap-affix';
import uibootstrap from 'angular-ui-bootstrap';
import coreUtils from './../../core/core.module.js';

export default angular.module('navigation', [bootstrapAffix, uibootstrap, coreUtils])
	.component('navigation', {
    template : require('./navigation.template.html'),
    controller :
        [ '$scope', 'User',
            // export default class
            function NavigationController($scope, User) {

                $scope.user = User.get();
                $scope.logout = function () {
                    console.log('logging out user ' + JSON.stringify(User.get()));
                    User.logout();
                }
            }
        ],
    bindings: {
        items: '=items', // or items: '<' it depends on what binding you need
        inverse: '=inverse', // if true, use a darker style (default=false)
        transparant: '=transparant' // if true, text/image behind navigation is assumed visible
    }
}).name;
