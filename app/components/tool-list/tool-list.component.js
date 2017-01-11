// Register `phoneList` component, along with its associated controller and template
angular.module('toolList').component('toolList', {
	templateUrl : 'components/tool-list/tool-list.template.html',
	controller :
	[ '$http', '$routeParams', function ToolListController($http, $routeParams) {
		var self = this;
		self.filterCategory = $routeParams.category
		$http.get('data/tools/tools.json').then(function(response) {
	        self.tools = response.data;
	      });

		this.translateCategory = function translateCategory(category) {
			catMap = {
				'construction' : 'Bouw',
				'electricity' : 'Elektriciteit',
				'wood' : 'Hout',
			};
			if (category in catMap) {
				return catMap[category];
			} else {
				return category;
			}
		}
	} ]
});