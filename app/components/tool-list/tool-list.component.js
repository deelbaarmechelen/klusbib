// angular.module('toolList').component('toolList', {
// 	bindings: { tools: '<', category: '<' , currentPage: '<', pageSize: '<', totalCount: '<'},
// 	templateUrl : '/components/tool-list/tool-list.template.html',
// 	controller :

export default class ToolListController {
// export default function ToolListController($http, User, UserService, __env, $stateParams, $state) {
    static get $$ngIsClass(){return true;}

    constructor($http, User, UserService, __env, $stateParams, $state) {
    	var self = this;
    	this.$http=$http;
    	this.User=User;
    	this.UserService=UserService;
    	this.__env=__env;
    	this.$stateParams=$stateParams;
    	this.$state=$state;

        // pagination
        this.totalItems = 0;
        this.currentPage = this.$stateParams.currentPage;
        this.maxSize = 3;
        this.itemsPerPage = 0;

        this.category = this.$stateParams.category;
        this.showFunctions = false;

        this.userId = this.User.get().id;
        if (this.userId !== undefined) {
            console.log('userId:' + this.userId);
            // FIXME: async call -> is this ok in a constructor?
            this.UserService.GetById(this.userId).then(function(response) {
            	if (response.success) {
                    self.user = response.message;
                    if (self.user.role == "admin") {
                        self.showFunctions = true;
                    }
				}

            });
        }
	}

	$onInit () {
		// initialise values after init completed (and bindings are available)
		this.totalItems = this.totalCount;
		this.itemsPerPage = this.pageSize;
	}

	pageChanged () {
		console.log('Page changed to: ' + this.currentPage);
		this.$state.go('tools', {category: this.category, page: this.currentPage});
	};
	filterCategory (newCategory) {
		console.log('Filtering category: ' + newCategory);
		this.$state.go('tools', {page: '1', category: newCategory});
	}

	resizeImage(imageUrl, size) {
		if (typeof imageUrl == 'undefined' || imageUrl == null) {
			return;
		}
		// only request specific sizes for API images
		if (!imageUrl.startsWith(__env.apiUrl)) {
			// images from other origins are taken as is
			return imageUrl;
		}
		let baseUrl = imageUrl.substr(0, imageUrl.lastIndexOf('.'));
		let ext = imageUrl.substr(imageUrl.lastIndexOf('.') + 1);
		let newUrl = baseUrl + '-' + size + '.' + ext;
		return newUrl;
	}

	translateCategory (category) {
		let catMap = {
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

	newTool() {
		alert ('not yet implemented!');
	}
	deleteTool (toolId, index) {
		alert ('not yet implemented!');
	}
}

ToolListController.$inject = [ '$http', 'User', 'UserService', '__env', '$stateParams', '$state'];
