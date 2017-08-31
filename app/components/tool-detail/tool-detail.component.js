angular.module('toolDetail').factory('alert', function($uibModal) {

	function show(action, event) {
		return $uibModal.open({
			templateUrl : '/app/components/tool-detail/modalContent.html',
			controller : function() {
				var vm = this;
				vm.action = action;
				vm.event = event;
			},
			controllerAs : 'vm'
		});
	}

	return {
		show : show
	};

});

angular.
  module('toolDetail').
  component('toolDetail', {
    templateUrl: 'components/tool-detail/tool-detail.template.html',
    controller: ['$http', '$routeParams','moment','calendarConfig', 'alert','__env', 
    	'User','ReservationService', 'Flash','calendarEventTitle',
      function ToolDetailController($http, $routeParams,moment,calendarConfig, alert, __env, 
    		  User, ReservationService, Flash, calendarEventTitle) {
          var self = this;
          self.toolId = $routeParams.toolId;
          self.user = User.get();
          self.isLogged = !!self.user.id
          self.showCalendar = self.isLogged;
          
          // Reservations
          self.canAddReservation = self.isLogged;
          self.requestReservation = function (user, tool, startDate, endDate) {
        	  console.log('reservation requested for tool ' + tool.name + ' by user ' + self.user.firstname 
        			  + ' from ' + startDate + ' to ' + endDate);
        	  ReservationService.Create(self.user.id, tool.tool_id, startDate, endDate)
	          	.then(function (response) {
		          	if (response.success) {
		          		reloadTool();
		                // First argument (string) is the type of the flash alert.
		                // Second argument (string) is the message displays in the flash alert (HTML is ok).
		                // Third argument (number, optional) is the duration of showing the flash. 0 to not automatically hide flash (user needs to click the cross on top-right corner).
		                // Fourth argument (object, optional) is the custom class and id to be added for the flash message created. 
		                // Fifth argument (boolean, optional) is the visibility of close button for this flash.
		                // Returns the unique id of flash message that can be used to call Flash.dismiss(id); to dismiss the flash message.
		          		var id = Flash.create('success', 'Reservatie aanvraag succesvol ingediend', 5000);
		          	} else {
		                var id = Flash.create('danger', response.message, 5000);
		          	}
	          });
          }
          self.startDatePicker = {
        		  opened: false
          };
          self.openDatePicker = function () {
        	  self.startDatePicker.opened = true;
          }
          self.updtReservationEndDate = function () {
        	  self.reservationEndDate = moment(self.reservationStartDate).add(7, 'days').toDate();
          }
          self.now = function () {
        	    return new Date();
          }
          
          self.calendarView = 'month';
          self.viewDate = new Date();
          var previousDate = moment(self.viewDate);

          // override default monthView and monthViewTooltip
          calendarEventTitle.monthView = function(event) {
        	  if (event.allDay) {
        	    return event.title + ' (' + moment(event.startsAt).format('D-MMM-YYYY') + ' - ' 
        	    	+ moment(event.endsAt).format('D-MMM-YYYY') + ')';
        	  }
        	  return event.title + ' (' + calendarDateFilter(event.startsAt, 'time', true) + ')';
          }
          calendarEventTitle.monthViewTooltip = function (event) {
        	  return event.title;
          }

          
          this.resizeImage = function (imageUrl, size) {
	  			if (typeof imageUrl == 'undefined' || imageUrl == null) {
	  				return;
	  			}
//	  			console.log('imageUrl=' + JSON.stringify(imageUrl));
				baseUrl = imageUrl.substr(0,imageUrl.lastIndexOf('.'));
				ext = imageUrl.substr(imageUrl.lastIndexOf('.')+1);
				newUrl = baseUrl + '-' + size + '.' + ext;
				return newUrl;
          }
			
          this.translateCategory = function translateCategory(category) {
				catMap = {
					'general' : 'Algemeen',
					'car' : 'Auto',
					'construction' : 'Bouw',
					'electricity' : 'Elektriciteit',
					'sanitary' : 'Sanitair',
					'wood' : 'Schrijnwerk',
					'garden' : 'Tuin',
				};
				if (category in catMap) {
					return catMap[category];
				} else {
					return category;
				}
          }

//  		var actions = [{
//              label: '<i class=\'glyphicon glyphicon-pencil\'></i>',
//              onClick: function(args) {
//                alert.show('Edited', args.calendarEvent);
//              }
//            }, {
//              label: '<i class=\'glyphicon glyphicon-remove\'></i>',
//              onClick: function(args) {
//                alert.show('Deleted', args.calendarEvent);
//              }
//            }];
		var actions = [{}];

        self.cellIsOpen = true;

        self.addEvent = function() {
        	  self.events.push({
                title: 'Reserved',
                startsAt: moment().startOf('day').toDate(),
                endsAt: moment().endOf('day').toDate(),
                color: calendarConfig.colorTypes.important,
                draggable: false,
                resizable: false,
                allDay: true
              });
        };

//            self.eventClicked = function(event) {
//              alert.show('Clicked', event);
//            };
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
//        	console.log('timespan clicked - date: ' + date + ', cell: ' + JSON.stringify(cell));
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
        
        self.assignEventColor = function(reservation) {
    	  var color = 'red';
    	  if ('maintenance' === reservation.type) {
    		  color = 'green';
    	  } else if ('reservation' === reservation.type) {
    		  color = 'blue';
    	  }
    	  var primarycolor = colourNameToHex('dark' + color);
    	  var secondarycolor = colourNameToHex(color);
    	  return { primary: primarycolor, secondary: secondarycolor};
        }
		var reloadTool = function () {
		      $http.get(__env.apiUrl + '/tools/'+ $routeParams.toolId).then(function(response) {
			        self.tool = response.data;
			        self.showCategory = function () {
			        	var selected = $filter('filter')(self.categories, {value: self.tool.category});
			        	return (self.tool.category && selected.length) ? selected[0].text : 'Not set';
			        };
			        self.events = [];
			        self.tool.reservations.forEach ( function (reservation){
			        	// skip cancelled reservations
			        	if (reservation.state == 'CANCELLED') {
			        		return;
			        	}
			        	var event = {
		    	                title: reservation.title,
		    	                color: self.assignEventColor(reservation),
		    	                startsAt: new Date(moment(reservation.startsAt, "YYYY-MM-DD")),
		    	                endsAt: new Date(moment(reservation.endsAt, "YYYY-MM-DD")),
		    	                draggable: false,
		    	                resizable: false,
		    	                actions: actions,
		    	                allDay: true
			        	}
			        	self.events.push(event);
			        });
			  });
		}
		reloadTool();
  }]
});