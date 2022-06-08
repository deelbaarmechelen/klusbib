import angular from 'angular';
import ToolDetailController from './tool-detail.component.js';
import 'angular-bootstrap-calendar';
import 'angular-bootstrap-calendar/dist/css/angular-bootstrap-calendar.min.css';
import 'angular-bootstrap-colorpicker';
import 'angular-bootstrap-colorpicker/css/colorpicker.min.css';
import uibootstrap from 'angular-ui-bootstrap';
import ngFlash from 'angular-flash-alert';

angular.module('toolDetail', [
  'mwl.calendar', uibootstrap,
  'colorpicker.module', ngFlash
]);


angular.module('toolDetail')
.config(['calendarConfig', function(calendarConfig) {
//
console.log(calendarConfig); //view all available config
//
//calendarConfig.templates.calendarMonthView = 'path/to/custom/template.html'; //change the month view template globally to a custom template
//calendarConfig.templates.calendarSlideBox = '/app/components/tool-detail/calendarSlideBox.html'; //change the slidebox template globally to a custom template
//
//calendarConfig.dateFormatter = 'moment'; //use either moment or angular to format dates on the calendar. Default angular. Setting this will override any date formats you have already set.
//
//calendarConfig.allDateFormats.moment.date.hour = 'HH:mm'; //this will configure times on the day view to display in 24 hour format rather than the default of 12 hour
//
//calendarConfig.allDateFormats.moment.title.day = 'ddd D MMM'; //this will configure the day view title to be shorter
//
//calendarConfig.i18nStrings.weekNumber = 'Week {week}'; //This will set the week number hover label on the month view
//
//calendarConfig.displayAllMonthEvents = true; //This will display all events on a month view even if they're not in the current month. Default false.
//
//calendarConfig.showTimesOnWeekView = true; //Make the week view more like the day view, with the caveat that event end times are ignored.
//
}]);

angular.module('toolDetail').factory('alert', function ($uibModal) {

    function show(action, event) {
        return $uibModal.open({
            template: require('./modalContent.html'),
            controller: function () {
                var vm = this;
                vm.action = action;
                vm.event = event;
            },
            controllerAs: 'vm'
        });
    }

    return {
        show: show
    };

});

angular.module('toolDetail').component('toolDetail', {
    bindings: {tool: '<'},
    template: require('./tool-detail.template.html').default,
    controller: ToolDetailController
});
export default angular.module('toolDetail').name;