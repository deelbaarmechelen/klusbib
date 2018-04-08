angular.module('toolList').component('toolList', {
	bindings: { tools: '<', category: '<' , currentPage: '<', pageSize: '<', totalCount: '<'},
	templateUrl : '/components/tool-list/tool-list.template.html',
	controller :
	[ '$http', 'User', 'UserService', '__env', '$stateParams', '$state',
		function ToolListController($http, User, UserService, __env, $stateParams, $state) {

		var self = this;
        // pagination
        self.totalItems = 0;
        self.currentPage = $stateParams.currentPage;
        self.maxSize = 3;
        self.itemsPerPage = 0;
        self.$onInit = function () {
            // initialise values after init completed (and bindings are available)
            self.totalItems = self.totalCount;
            self.itemsPerPage = self.pageSize;
        }

        self.pageChanged = function() {
            console.log('Page changed to: ' + self.currentPage);
            $state.go('tools', {category: self.category, page: self.currentPage});
        };

        self.userId = User.get().id;
        if (self.userId !== undefined) {
            console.log('userId:' + self.userId);
            self.user = UserService.GetById(self.userId).then(function(response) {
                if (response.success && response.message.role == "admin") {
                    self.showFunctions = true;
                }
            });
        }
        self.category = $stateParams.category;
        self.showFunctions = false;
		self.filterCategory = function(newCategory) {
            console.log('Filtering category: ' + newCategory);
            $state.go('tools', {page: '1', category: newCategory});
        }

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