angular.module('consumerList').component('consumerList', {
	templateUrl : 'components/consumer-list/consumer-list.template.html',
	controller :
	[ '$http', '__env', function ToolListController($http, __env) {
		var self = this;
		$http.get(__env.apiUrl + '/consumers').then(function(response) {
	        self.consumers = response.data;
	      });

	} ]
});
