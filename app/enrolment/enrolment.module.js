import angular from 'angular';
import routing from "./enrolment.config.js";
import EnrolmentController from "./enrolment.controller";
import PaymentService from '../services/payment.service.js';

import './style.css';

const MODULE_NAME = 'enrolment';
export const ENROLMENT_MODULE = angular.module(MODULE_NAME, []);

ENROLMENT_MODULE.config(routing);
ENROLMENT_MODULE.controller('EnrolmentController', EnrolmentController);
ENROLMENT_MODULE.service('PaymentService', PaymentService);
