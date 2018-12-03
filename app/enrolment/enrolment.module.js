import angular from 'angular';
import routing from "./enrolment.config.js";
import EnrolmentController from "./enrolment.controller";
import EnrolmentConfirmController from "./enrolment.confirm.controller.js";
import PaymentService from '../services/payment.service.js';
import EnrolmentService from '../services/enrolment.service.js';
import angularMoment from 'angular-moment';

import './style.css';

const MODULE_NAME = 'enrolment';
export const ENROLMENT_MODULE = angular.module(MODULE_NAME, [angularMoment]);

ENROLMENT_MODULE.config(routing);
ENROLMENT_MODULE.controller('EnrolmentController', EnrolmentController);
ENROLMENT_MODULE.controller('EnrolmentConfirmController', EnrolmentConfirmController);
ENROLMENT_MODULE.directive('myLink', function() {
    return {
        scope: {
            enabled: '=myLink'
        },
        link: function (scope, element, attrs) {
            element.bind('click', function (event) {
                if (!scope.enabled) {
                    event.preventDefault();
                }
            });

        }
    };
});
ENROLMENT_MODULE.service('PaymentService', PaymentService);
ENROLMENT_MODULE.service('EnrolmentService', EnrolmentService);
