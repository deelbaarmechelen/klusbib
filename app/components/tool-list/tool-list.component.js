angular.module('toolList').component('toolList', {
	templateUrl : 'components/tool-list/tool-list.template.html',
	controller :
	[ '$http', '$routeParams', '__env',
		function ToolListController($http, $routeParams, __env) {

		var self = this;
		self.filterCategory = $routeParams.category;
		$http.get(__env.apiUrl + '/tools').then(function(response) {
	        self.tools = response.data;
	      });

		this.resizeImage = function (imageUrl, size) {
			baseUrl = imageUrl.substr(0,imageUrl.lastIndexOf('.'));
			ext = imageUrl.substr(imageUrl.lastIndexOf('.')+1);
			newUrl = baseUrl + '-' + size + '.' + ext;
			return newUrl;
		}
		
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