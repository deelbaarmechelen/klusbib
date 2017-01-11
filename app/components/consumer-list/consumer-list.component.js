angular.module('consumerList').component('consumerList', {
	templateUrl : 'components/consumer-list/consumer-list.template.html',
	controller :
	[ '$http', function ToolListController($http) {
		var self = this;
		$http.get('data/consumers/consumers.json').then(function(response) {
	        self.consumers = response.data;
	      });

	} ]
});