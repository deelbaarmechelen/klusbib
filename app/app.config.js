// This file should handle routes configuration

routing.$inject = ['$stateProvider', '$urlRouterProvider'];

export default function routing($stateProvider, $urlRouterProvider) {

	 var homeState = {
	    name: 'home',
	    views: {
	    	nav: {
	    		component: 'navigation',
	    	},
	    	main: {
	    		template: require('./home/home.view.html'),
	    		controller: 'HomeController'
//	    		css: 'home/css/creative.css'
	    	}
	    },
	    url: '/',
	    resolve: {
	    	transparant: function () {return true;},
	    	items: function () {
	    		var menuItems = [
					{'label': 'Over ons', 'href': '/#!/#about'}, 
					{'label': 'Waar', 'href': '/#!/#where'},
					{'label': 'Contact', 'href': '/#!/#contact'},
					{'label': 'FAQ', 'href': '/#!/#faq'}
				];
	    		return menuItems;
	    	}
	    }
	  }
	  var signInState = {
			    name: 'signin',
			    url: '/signin',
			    views: {
			    	nav: {
			    		component: 'navigation'
			    	},
			    	main: {
			    		component: 'signIn'
			    	}
			    },
			    resolve: {
			    	inverse: function() {
			    		return true;
			        }
			    }
	  }
	  var toolsListState = {
			    name: 'tools',
			    url: '/tools/category/{category}/page/{page}',
			    views: {
			    	nav: {
			    		component: 'navigation'
			    	},
			    	main: {
			    		component: 'toolList',
			    	}
			    },
          		params: {category: 'general', page: '1'},
          		resolve: {
                    inverse: function() {
                        return true;
                    },
                    category: ['$stateParams', function($stateParams) {
						return $stateParams.category;
                    }],
                    currentPage: ['$stateParams', function($stateParams) {
                        return parseInt($stateParams.page) || 1;
                    }],
                    pageSize: function() {
                        return 25;
                    },
                    toolsData: ['ToolService','category', 'currentPage', 'pageSize', function(ToolService, category, currentPage, pageSize) {
                        return ToolService.GetByCategoryOrderBy(category, currentPage, pageSize).then(function(response) {
                            if (response.success) {
								console.log('Total count:' + response.totalCount);
                                return {tools: response.message, count:response.totalCount};
                            }
                        });
                    }],
					tools: ['toolsData', function (toolsData) {
                    	return toolsData.tools;
                    }],
					totalCount: ['toolsData', function(toolsData) {
                    	return toolsData.count;
					}]
			    }
	  }
	  var toolDetailState = {
			    name: 'toolDetail',
			    url: '/tools/{toolId}',
			    views: {
			    	nav: {
			    		component: 'navigation'
			    	},
			    	main: {
			    		component: 'toolDetail',
			    	}
			    },
			    resolve: {
			        tool: ['ToolService', '$transition$', function(ToolService, $transition$) {
			          return ToolService.GetById($transition$.params().toolId).then(function(response) {
			    			if (response.success) {
			    				return response.message;
			    			}
			          });
			    	}],
			    	inverse: function() {
			    		return true;
			        }
			    }
	  }
	  var consumersState = {
			    name: 'consumers',
			    url: '/consumers',
			    views: {
			    	nav: {
			    		component: 'navigation'
			    	},
			    	main: {
			    		component: 'consumerList',
			    	}
			    },
			    resolve: {
			    	inverse: function() {
			    		return true;
			        }
			    }
	  }
	  var reservationsState = {
			    name: 'reservations',
			    url: '/reservations',
			    views: {
			    	nav: {
			    		component: 'navigation'
			    	},
			    	main: {
			    		component: 'reservationList',
			    	}
			    },
			    resolve: {
			    	inverse: function() {
			    		return true;
			        }
			    }
	  }
	  var profileState = {
			    name: 'profile',
			    url: '/profile/{userId}',
			    views: {
			    	nav: {
			    		component: 'navigation'
			    	},
			    	main: {
			    		component: 'myProfile',
			    	}
			    },
				resolve: {
					user: ['UserService', '$transition$', function(UserService, $transition$) {
				          return UserService.GetById($transition$.params().userId);
				    }],
				    inverse: function() {
				    	return true;
				    }
				}
	  }
	  var enrolmentState = {
			    name: 'enrolment',
			    url: '/lid-worden',
			    views: {
			    	nav: {
			    		component: 'navigation'
			    	},
			    	main: {
			    		template: require('./enrolment/enrolment.view.html'),
				    	controller: 'EnrolmentController as vm'
			    	}
			    },
			    resolve: {
			    	inverse: function() {
			    		return true;
			        }
			    }
			  }
	  var resetPwdState = {
			    name: 'reset-pwd',
			    url: '/reset-pwd',
			    views: {
			    	nav: {
			    		component: 'navigation'
			    	},
			    	main: {
			    		template: require('./enrolment/reset-pwd.view.html'),
				    	controller: 'EnrolmentController as vm'
			    	}
			    },
			    resolve: {
			    	inverse: function() {
			    		return true;
			        }
			    }
			  }
	  var volunteerState = {
			    name: 'volunteer',
			    url: '/vrijwilligers',
			    views: {
			    	nav: {
			    		component: 'navigation'
			    	},
			    	main: {
			    		template: require('./volunteer/volunteer.view.html'),
				    	controller: 'VolunteerController'
			    	}
			    },
			    resolve: {
			    	inverse: function() {
			    		return true;
			        }
			    }
			  }

	$stateProvider.state(homeState);
	$stateProvider.state(signInState);
	$stateProvider.state(toolsListState);
	$stateProvider.state(toolDetailState);
	$stateProvider.state(consumersState);
	$stateProvider.state(reservationsState);
	$stateProvider.state(profileState);
	$stateProvider.state(enrolmentState);
	$stateProvider.state(resetPwdState);
	$stateProvider.state(volunteerState);

	$urlRouterProvider.otherwise('/')
};


