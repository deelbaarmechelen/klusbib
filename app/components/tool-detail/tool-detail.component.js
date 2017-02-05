angular.
	module('toolDetail').
	factory('alert', function($uibModal) {

  function show(action, event) {
    return $uibModal.open({
      templateUrl: 'components/tool-detail/modalContent.html',
      controller: function() {
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

angular.
  module('toolDetail').
  component('toolDetail', {
    templateUrl: 'components/tool-detail/tool-detail.template.html',
    controller: ['$http', '$routeParams','moment','calendarConfig', 'alert',
      function ToolDetailController($http, $routeParams,moment,calendarConfig, alert) {
          var self = this;
          self.toolId = $routeParams.toolId;
          self.calendarView = 'month';
          self.viewDate = new Date();
          var previousDate = moment(self.viewDate);

          
          var actions = [{
              label: '<i class=\'glyphicon glyphicon-pencil\'></i>',
              onClick: function(args) {
                alert.show('Edited', args.calendarEvent);
              }
            }, {
              label: '<i class=\'glyphicon glyphicon-remove\'></i>',
              onClick: function(args) {
                alert.show('Deleted', args.calendarEvent);
              }
            }];
//            self.events = [];
          self.events = [
              {
                title: 'An event',
                color: calendarConfig.colorTypes.warning,
                startsAt: moment().startOf('week').subtract(2, 'days').add(8, 'hours').toDate(),
                endsAt: moment().startOf('week').add(1, 'week').add(9, 'hours').toDate(),
                draggable: true,
                resizable: true,
                actions: actions
              }, {
                title: '<i class="glyphicon glyphicon-asterisk"></i> <span class="text-primary">Another event</span>, with a <i>html</i> title',
                color: calendarConfig.colorTypes.info,
                startsAt: moment().subtract(1, 'day').toDate(),
                endsAt: moment().add(5, 'days').toDate(),
                draggable: true,
                resizable: true,
                actions: actions
              }, {
                title: 'This is a really long event title that occurs on every year',
                color: calendarConfig.colorTypes.important,
                startsAt: moment().startOf('day').add(7, 'hours').toDate(),
                endsAt: moment().startOf('day').add(19, 'hours').toDate(),
                recursOn: 'year',
                draggable: true,
                resizable: true,
                actions: actions
              }
            ];

          self.cellIsOpen = true;

          self.addEvent = function() {
        	  self.events.push({
                title: 'Reserved',
                startsAt: moment().startOf('day').toDate(),
                endsAt: moment().endOf('day').toDate(),
                color: calendarConfig.colorTypes.important,
                draggable: true,
                resizable: true
              });
            };

            self.eventClicked = function(event) {
              alert.show('Clicked', event);
            };
//
//            self.eventEdited = function(event) {
//              alert.show('Edited', event);
//            };
//
//            self.eventDeleted = function(event) {
//              alert.show('Deleted', event);
//            };
//
//            self.eventTimesChanged = function(event) {
//              alert.show('Dropped or resized', event);
//            };

            self.toggle = function($event, field, event) {
              $event.preventDefault();
              $event.stopPropagation();
              event[field] = !event[field];
            };

            self.timespanClicked = function(date, cell) {

           	if (self.calendarView === 'month') {
                if ((self.cellIsOpen && moment(date).startOf('day').isSame(moment(self.viewDate).startOf('day'))) || cell.events.length === 0 || !cell.inMonth) {
                	self.cellIsOpen = false;
                } else {
                	self.cellIsOpen = true;
                	self.viewDate = date;
                }
              } else if (self.calendarView === 'year') {
                if ((self.cellIsOpen && moment(date).startOf('month').isSame(moment(self.viewDate).startOf('month'))) || cell.events.length === 0) {
                	self.cellIsOpen = false;
                } else {
                	self.cellIsOpen = true;
                	self.viewDate = date;
                }
              }

            };
          
          $http.get('/api/public/tools/'+ $routeParams.toolId).then(function(response) {
    	        self.tool = response.data;
    	        self.showCategory = function () {
    	        	var selected = $filter('filter')(self.categories, {value: self.tool.category});
    	        	return (self.tool.category && selected.length) ? selected[0].text : 'Not set';
    	        };
    	        self.events = [];
    	        self.tool.reservations.forEach ( function (reservation){
    	        	var primarycolor = colourNameToHex('dark' + reservation.color);
    	        	var secondarycolor = colourNameToHex(reservation.color);
    	        	var event = {
        	                title: reservation.title,
//        	                color: calendarConfig.colorTypes.warning,
        	                color: { primary: primarycolor, secondary: secondarycolor},
        	                startsAt: new Date(moment(reservation.startsAt, "YYYY-MM-DD")),
        	                endsAt: new Date(moment(reservation.endsAt, "YYYY-MM-DD")),
        	                draggable: true,
        	                resizable: true,
        	                actions: actions
    	        	}
    	        	self.events.push(event);
    	        });
    	  });
        }
    ]
  });