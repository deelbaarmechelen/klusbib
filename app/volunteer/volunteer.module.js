import angular from 'angular';
import volunteerCalendar from '../components/volunteer-calendar/volunteer-calendar.module.js';
import volunteerRouting from "./volunteer.config.js";

const MODULE_NAME = 'volunteer';
export const VOLUNTEER_MODULE = angular.module(MODULE_NAME, [volunteerCalendar]);
VOLUNTEER_MODULE.config(volunteerRouting);

VOLUNTEER_MODULE.controller('VolunteerController', VolunteerController);

function VolunteerController() {
    var vm = this;

}

// VOLUNTEER_MODULE.config(['$stateRegistryProvider', function($stateRegistry) {
//     $stateRegistry.register(contactsState);
//     $stateRegistry.register(newContactState);
//     $stateRegistry.register(viewContactState);
//     $stateRegistry.register(editContactState);
// }]);
// export default MODULE_NAME;
