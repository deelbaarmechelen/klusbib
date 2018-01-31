angular.module('toolList').component('toolList', {
	bindings: { tools: '<', category: '<' },
	templateUrl : '/components/tool-list/tool-list.template.html',
	controller :
	[ '$http', 'User', 'UserService', '__env', '$stateParams',
		function ToolListController($http, User, UserService, __env, $stateParams) {

		var self = this;
        self.userId = User.get().id;
        self.user = UserService.GetById(self.userId).then(function(response) {
        	if (response.success && response.message.role == "admin") {
        		self.showFunctions = true;
        	}
        });
//        self.category = $stateParams.category;
        self.showFunctions = false;
		self.filterCategory = $stateParams.category;
//		self.filterCategory = 'general';
//		$http.get(__env.apiUrl + '/tools?_perPage=100').then(function(response) {
//	        self.tools = response.data;
//	      });

		this.resizeImage = function (imageUrl, size) {
			baseUrl = imageUrl.substr(0,imageUrl.lastIndexOf('.'));
			ext = imageUrl.substr(imageUrl.lastIndexOf('.')+1);
			newUrl = baseUrl + '-' + size + '.' + ext;
			return newUrl;
		}
		
		this.translateCategory = function (category) {
			catMap = {
					'general' : 'Algemeen',
					'car' : 'Auto',
					'construction' : 'Bouw',
					'technics' : 'Technieken',
					'wood' : 'Schrijnwerk',
					'garden' : 'Tuin',
			};
			if (category in catMap) {
				return catMap[category];
			} else {
				return category;
			}
		}

		this.newTool = function () {
			alert ('not yet implemented!');
		}
		this.deleteTool = function (toolId, index) {
			alert ('not yet implemented!');
		}

	} ]
});