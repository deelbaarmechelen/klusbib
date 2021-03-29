MyProfileController.$inject = ['$http', '__env', 'UserService', 'ReservationService', 'LendingService', 'DeliveryService', '$location','Flash', '$state'];
export default function MyProfileController($http, __env, UserService, ReservationService, LendingService, DeliveryService, $location, Flash, $state) {
    var self = this;
    self.moment = require('moment');
    this.$onChanges = function(changesObj) {
        // actions to perform when user changes
      if (changesObj.user && changesObj.user.currentValue) {
          if (changesObj.user.currentValue.success) {
              self.user = changesObj.user.currentValue.message;
              self.reservations = filterFutureReservations(self.user.reservations);
              translateReservations(self.reservations);
              LendingService.GetActiveByUser(self.user.user_id).then(function (response) {
                  if (response.success) {
                      self.lendings = response.message;
                  } else {
                      console.log(response.message);
                      // var id = Flash.create('danger', response.message, 5000);
                  }
              });
              self.deliveries = filterCancelledDeliveries(self.user.deliveries);
              translateDeliveries(self.deliveries);
              self.projects = self.user.projects;
              self.deliveriesEnabled = enableDeliveries();
          } else {
              if (changesObj.user.currentValue.status == 401) {
                  $location.path('/signin');
              }
              Flash.create('danger',
                      'Er is een probleem opgetreden bij het laden van de gebruikersgegevens. Probeer later opnieuw', 0);
          }
      }
    }
    Flash.clear(); // page (re)load -> clear all messages
    self.reservationsEnabled = true;
    self.lendingsEnabled = true;
    self.deliveriesEnabled = enableDeliveries();
    self.deliveries = [];

    function enableDeliveries() {

        if (!self.projects) {
            return false;
        }
        let enabled = false;
        self.projects.forEach(function(item, key) {
            if (item.name === 'Delivery') {
                enabled = true;
            }
        });
        return enabled;

    }
    function isAdmin(user) {
      if (user.role === "admin" && user.state === "ACTIVE") {
          return true;
      }
      return false;
    }
    self.showAdminLinks = function () {
        return isAdmin(self.user);
    }
    self.showReservationsLink = self.showAdminLinks && self.reservationsEnabled;

    self.updateUser = function() {
      var userToUpdate = {"user_id":this.user.user_id,
              "firstname":this.user.firstname,
              "lastname":this.user.lastname,
              "email":this.user.email,
              "address":this.user.address,
              "postal_code":this.user.postal_code,
              "city":this.user.city,
              "phone":this.user.phone,
              "mobile":this.user.mobile,
              "registration_number":this.user.registration_number,
              }
      console.log("updating user " + JSON.stringify(userToUpdate));

      UserService.Update(userToUpdate).then(function (response) {
            if (response.success) {
                var id = Flash.create('success', 'Aanpassingen bewaard', 5000);
            } else {
                console.log(response.message);
                var id = Flash.create('danger', response.message, 0);
            }
      });
    };
    self.renewal = function () {
        if (this.user.state === 'ACTIVE' || this.user.state === 'EXPIRED') {
            return $state.go('enrolment.renewal', {'userId': this.user.user_id});
        } else {
            Flash.create('warning', 'Online hernieuwing niet mogelijk, neem contact met ons op');
        }
    }

    self.extend = function (item) {
      alert('extend not yet implemented');
    }
    self.cancel = function (item) {
      console.log('cancelling reservation ' + JSON.stringify(item));
      // TODO: allow to specify start date
      ReservationService.Cancel(item)
        .then(function (response) {
            if (response.success) {
                translateReservationState(item);
                // FIXME: update value on screen still requires reload...
                var id = Flash.create('success', 'Reservatie geannuleerd', 5000);
            } else {
                console.log(response.message);
                var id = Flash.create('danger', response.message, 0);
            }
      });
    }

    var filterFutureReservations = function (items) {
      if(!angular.isArray(items)) return [];

      var currentDate = new Date();
      currentDate.setHours(0,0,0,0); //Just normalize the time offset, since item is just date.

      return items.filter(function(item){
          return new Date(item.endsAt) >= currentDate;
        });
    };
    var filterCancelledDeliveries = function (items) {
        if(!angular.isArray(items)) return [];

        return items.filter(function (item) {
            return item.state != 'CANCELLED'
        });
    };
    var translateReservations = function (items) {
      if(!angular.isArray(items)) return [];

      return items.map(translateReservationState);
    };
    var translateReservationState = function(item) {
        return translateCommonState(item);
    };
    var translateDeliveries = function (items) {
        if(!angular.isArray(items)) return [];

        return items.map(translateDeliveryState);
    };
    var translateDeliveryState = function(item) {
        item = translateCommonState(item);
        if (item.state == 'NEW') {
            item.translated_state = 'Nieuw';
        }
        return item;
    };
    var translateCommonState = function(item){
        item.translated_state = item.state;
        if (item.state == 'REQUESTED') {
            item.translated_state = 'Aangevraagd';
        }
        if (item.state == 'CONFIRMED') {
            item.translated_state = 'Bevestigd';
        }
        if (item.state == 'CANCELLED') {
            item.translated_state = 'Annulatie';
        }
        return item;
    };

    // deliveries
    self.deliveryRequest = function (reservations) {
        console.log('delivery request  ' + JSON.stringify(reservations));
        let drop_off_address = self.user.address + ', ' + self.user.postal_code + ' ' + self.user.city;
        let availableDeliveryDates = [];
        let delivery = {
            state : 'NEW',
            items : [],
            drop_off_address: drop_off_address
        };
        reservations.forEach(function(item, key) {
            if (item.selected === true) {
                console.log(item, key);
                let newItem = copy(item);
                newItem.name = item.tool_name;
                newItem.sku = item.tool_code;
                newItem.fee = item.tool_fee;
                newItem.size = item.tool_size;
                delivery.items.push(newItem);
            }
        });
        delivery.items.forEach(function(item, key) {
            availableDeliveryOptions().forEach(function (deliveryDate, dateKey){
                let possibleDate = self.moment(deliveryDate.date);
                if (possibleDate >= self.moment(item.startsAt) && possibleDate <= self.moment(item.endsAt)) {
                    availableDeliveryDates.push({date: possibleDate.format('YYYY-MM-DD'), formatted: possibleDate.format('YYYY-MM-DD')});
                }
            });
        });
        delivery.delivery_options = availableDeliveryDates;
        translateDeliveryState(delivery);
        self.deliveries.push(delivery);
        console.log(self.deliveries);
    };
    self.isNewDelivery = function(delivery) {
        return delivery.state =='NEW';
    };

    self.confirmDeliveryRequest = function(delivery) {
        console.log('delivery confirmation  ' + JSON.stringify(delivery));
        delivery.pick_up_address = 'Potterij 5, 2800 Mechelen';
        delivery.pick_up_date = null;
        delivery.state = 'REQUESTED';
        DeliveryService.Create(delivery, this.user.user_id)
            .then(function (response) {
                if (response.success) {
                    translateDeliveryState(delivery);
                    // FIXME: update value on screen still requires reload...
                    var id = Flash.create('success', 'Levering aangevraagd', 5000);
                } else {
                    console.log(response.message);
                    var id = Flash.create('danger', response.message, 0);
                }
            });

    };
    self.cancelDeliveryRequest = function(delivery) {
        const index = self.deliveries.indexOf(delivery);
        if (index > -1) {
            let delivery = self.deliveries[index];
            if (delivery.state != 'NEW') {
                DeliveryService.Cancel(delivery);
            }
            self.deliveries.splice(index, 1);
        }
    };

    function availableDeliveryOptions() {
        let deliveryOptions = [];
        //let firstPossibleDate = self.moment().add(2, 'days'); // TODO: update date based on reservation start?
        let firstPossibleDate = nextWednesday(self.moment());
        deliveryOptions.push({date: firstPossibleDate.format('YYYY-MM-DD'), formatted: firstPossibleDate.format('YYYY-MM-DD')}) // first possible date
        let i = 0;
        for (i = 1; i < 14; i++) {
            let possibleDate = self.moment(firstPossibleDate).add(i, 'days');
            if (isWeekDay(possibleDate)) {
                deliveryOptions.push({date: possibleDate.format('YYYY-MM-DD'), formatted: possibleDate.format('YYYY-MM-DD')})
            }
        }
        return deliveryOptions;
    }

    /**
     * returns true if the given date is Mo-Fr
     * @param date momentjs date
     */
    function isWeekDay(date) {
        return date.isoWeekday() !== 6 && date.isoWeekday() !== 7;
    }
    function nextWednesday(date) {
        let weekDay = date.isoWeekday();
        if (weekDay === 3) return date;
        if (weekDay < 3) {
            return self.moment(date).add(3 - weekDay, 'days');
        }
        if (weekDay > 3) {
            return self.moment(date).add(10 - weekDay, 'days');
        }
        return date.isoWeekday() !== 6 && date.isoWeekday() !== 7;
    }
    function copy(x) {
        return JSON.parse( JSON.stringify(x) );
    }
}