import angular from 'angular';
// import './consumer-list.component.js';

angular.module('consumerList', []);

angular.module('consumerList').component('consumerList', {
    template : require('./consumer-list.template.html'),
    controller :
        [ '$http', '__env', function ToolListController($http, __env) {
            var self = this;
            $http.get(__env.apiUrl + '/consumers').then(function(response) {
                self.consumers = response.data;
            });

        } ]
});
export default angular.module('consumerList').name;