import angular from 'angular';
import MyProfileController from './my-profile.component.js';

angular.module('myProfile', [
]);

angular.module('myProfile').config(['$httpProvider', function ($httpProvider) {
	$httpProvider.interceptors.push(['$q', '$localStorage', function ($q, $localStorage) {
        return {
            'request': function (config) {
                config.headers = config.headers || {};
                if ($localStorage.token) {
                    config.headers.Authorization = 'Bearer ' + $localStorage.token;
                }
                return config;
            },
            'responseError': function (response) {
                if (response.status === 401 || response.status === 403) {
//                    delete $localStorage.token;
//                    $location.path('/signin');
                }
                return $q.reject(response);
            }
        };
    }]);
}]);

angular.module('myProfile').
component('myProfile', {
    bindings: {user: '<'},
    template: require('./my-profile.template.html').default,
    controller: MyProfileController
});

// filter array by @field {String}
// return items from @daysBefore {Number} ago to @daysAfter {Number} from now
// eg: events | recentAndUpcoming:'StartDateTime':7:30
angular.module('myProfile').
filter('recentAndUpcoming', ['moment', function(moment){
    return function(items, field, daysBefore, daysAfter){
        var timeStart = moment().subtract(daysBefore, 'days');
        var timeEnd = moment().add(daysAfter, 'days');
        return items.filter(function(item){
            console.log(item[field]);
            //return true;
            return (moment(item[field], 'YYYY-MM-DD') > timeStart && moment(item[field], 'YYYY-MM-DD') < timeEnd);
        });
    };
}]);
// filter deliveries by date
// return items from @daysBefore {Number} ago to @daysAfter {Number} from now
// eg: events | recentAndUpcomingDeliveries:7:30
angular.module('myProfile').
filter('recentAndUpcomingDeliveries', ['moment', function(moment){
    return function(items, daysBefore, daysAfter){
        var timeStart = moment().subtract(daysBefore, 'days');
        var timeEnd = moment().add(daysAfter, 'days');
        return items.filter(function(item){
            let deliveryDate = item.type === 'PICKUP' ? item.pick_up_date : item.drop_off_date;
            if (!deliveryDate) {return true;} // also show deliveries with date null or undefined

            return (moment(deliveryDate, 'YYYY-MM-DD') > timeStart && moment(deliveryDate, 'YYYY-MM-DD') < timeEnd);
        });
    };
}]);
export default angular.module('myProfile').name;
