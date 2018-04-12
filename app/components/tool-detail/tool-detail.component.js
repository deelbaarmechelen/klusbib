

// angular.module('toolDetail').component('toolDetail', {
//     bindings: {tool: '<'},
//     templateUrl: 'components/tool-detail/tool-detail.template.html',
//     controller: ['$http', 'moment', 'calendarConfig', 'alert', '__env',
//         'User', 'ReservationService', 'Flash', 'calendarEventTitle',
ToolDetailController.$inject = ['$http', 'moment', 'calendarConfig', 'alert', '__env',
         'User', 'ReservationService', 'Flash', 'calendarEventTitle'];

export default function ToolDetailController($http, moment, calendarConfig, alert, __env,
                                      User, ReservationService, Flash, calendarEventTitle) {
            var self = this;
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
            calendarEventTitle.monthView = function (event) {
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
                let baseUrl = imageUrl.substr(0, imageUrl.lastIndexOf('.'));
                let ext = imageUrl.substr(imageUrl.lastIndexOf('.') + 1);
                let newUrl = baseUrl + '-' + size + '.' + ext;
                return newUrl;
            }

            this.translateCategory = function translateCategory(category) {
                let catMap = {
                    'general': 'Algemeen',
                    'car': 'Auto',
                    'construction': 'Bouw',
                    'technics': 'Technieken',
                    'wood': 'Schrijnwerk',
                    'garden': 'Tuin',
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

            self.addEvent = function () {
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

            self.toggle = function ($event, field, event) {
                $event.preventDefault();
                $event.stopPropagation();
                event[field] = !event[field];
            };

            self.timespanClicked = function (date, cell) {
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

            self.reloadTool = function (toolId) {
                $http.get(__env.apiUrl + '/tools/' + toolId).then(function (response) {
                    self.tool = response.data;
                    self.showCategory = function () {
                        var selected = $filter('filter')(self.categories, {value: self.tool.category});
                        return (self.tool.category && selected.length) ? selected[0].text : 'Not set';
                    };
                    self.events = [];
                    self.tool.reservations.forEach(function (reservation) {
                        // skip cancelled reservations
                        if (reservation.state == 'CANCELLED') {
                            return;
                        }
                        var event = {
                            title: reservation.title,
                            color: assignEventColor(reservation),
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
            function assignEventColor(reservation) {
                var color = 'red';
                if ('maintenance' === reservation.type) {
                    color = 'green';
                } else if ('reservation' === reservation.type) {
                    color = 'blue';
                }
                var primarycolor = colourNameToHex('dark' + color);
                var secondarycolor = colourNameToHex(color);
                return {primary: primarycolor, secondary: secondarycolor};
            }
            function colourNameToHex(colour) {
                var colours = {"aliceblue":"#f0f8ff","antiquewhite":"#faebd7","aqua":"#00ffff","aquamarine":"#7fffd4","azure":"#f0ffff",
                    "beige":"#f5f5dc","bisque":"#ffe4c4","black":"#000000","blanchedalmond":"#ffebcd","blue":"#0000ff","blueviolet":"#8a2be2","brown":"#a52a2a","burlywood":"#deb887",
                    "cadetblue":"#5f9ea0","chartreuse":"#7fff00","chocolate":"#d2691e","coral":"#ff7f50","cornflowerblue":"#6495ed","cornsilk":"#fff8dc","crimson":"#dc143c","cyan":"#00ffff",
                    "darkblue":"#00008b","darkcyan":"#008b8b","darkgoldenrod":"#b8860b","darkgray":"#a9a9a9","darkgreen":"#006400","darkkhaki":"#bdb76b","darkmagenta":"#8b008b","darkolivegreen":"#556b2f",
                    "darkorange":"#ff8c00","darkorchid":"#9932cc","darkred":"#8b0000","darksalmon":"#e9967a","darkseagreen":"#8fbc8f","darkslateblue":"#483d8b","darkslategray":"#2f4f4f","darkturquoise":"#00ced1",
                    "darkviolet":"#9400d3","deeppink":"#ff1493","deepskyblue":"#00bfff","dimgray":"#696969","dodgerblue":"#1e90ff",
                    "firebrick":"#b22222","floralwhite":"#fffaf0","forestgreen":"#228b22","fuchsia":"#ff00ff",
                    "gainsboro":"#dcdcdc","ghostwhite":"#f8f8ff","gold":"#ffd700","goldenrod":"#daa520","gray":"#808080","green":"#008000","greenyellow":"#adff2f",
                    "honeydew":"#f0fff0","hotpink":"#ff69b4",
                    "indianred ":"#cd5c5c","indigo":"#4b0082","ivory":"#fffff0","khaki":"#f0e68c",
                    "lavender":"#e6e6fa","lavenderblush":"#fff0f5","lawngreen":"#7cfc00","lemonchiffon":"#fffacd","lightblue":"#add8e6","lightcoral":"#f08080","lightcyan":"#e0ffff","lightgoldenrodyellow":"#fafad2",
                    "lightgrey":"#d3d3d3","lightgreen":"#90ee90","lightpink":"#ffb6c1","lightsalmon":"#ffa07a","lightseagreen":"#20b2aa","lightskyblue":"#87cefa","lightslategray":"#778899","lightsteelblue":"#b0c4de",
                    "lightyellow":"#ffffe0","lime":"#00ff00","limegreen":"#32cd32","linen":"#faf0e6",
                    "magenta":"#ff00ff","maroon":"#800000","mediumaquamarine":"#66cdaa","mediumblue":"#0000cd","mediumorchid":"#ba55d3","mediumpurple":"#9370d8","mediumseagreen":"#3cb371","mediumslateblue":"#7b68ee",
                    "mediumspringgreen":"#00fa9a","mediumturquoise":"#48d1cc","mediumvioletred":"#c71585","midnightblue":"#191970","mintcream":"#f5fffa","mistyrose":"#ffe4e1","moccasin":"#ffe4b5",
                    "navajowhite":"#ffdead","navy":"#000080",
                    "oldlace":"#fdf5e6","olive":"#808000","olivedrab":"#6b8e23","orange":"#ffa500","orangered":"#ff4500","orchid":"#da70d6",
                    "palegoldenrod":"#eee8aa","palegreen":"#98fb98","paleturquoise":"#afeeee","palevioletred":"#d87093","papayawhip":"#ffefd5","peachpuff":"#ffdab9","peru":"#cd853f","pink":"#ffc0cb","plum":"#dda0dd","powderblue":"#b0e0e6","purple":"#800080",
                    "rebeccapurple":"#663399","red":"#ff0000","rosybrown":"#bc8f8f","royalblue":"#4169e1",
                    "saddlebrown":"#8b4513","salmon":"#fa8072","sandybrown":"#f4a460","seagreen":"#2e8b57","seashell":"#fff5ee","sienna":"#a0522d","silver":"#c0c0c0","skyblue":"#87ceeb","slateblue":"#6a5acd","slategray":"#708090","snow":"#fffafa","springgreen":"#00ff7f","steelblue":"#4682b4",
                    "tan":"#d2b48c","teal":"#008080","thistle":"#d8bfd8","tomato":"#ff6347","turquoise":"#40e0d0",
                    "violet":"#ee82ee",
                    "wheat":"#f5deb3","white":"#ffffff","whitesmoke":"#f5f5f5",
                    "yellow":"#ffff00","yellowgreen":"#9acd32"};

                if (typeof colours[colour.toLowerCase()] != 'undefined')
                    return colours[colour.toLowerCase()];

                return false;
            };
        }