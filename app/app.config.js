// This file should handle routes configuration

routing.$inject = ['$stateProvider', '$urlRouterProvider'];

export default function routing($stateProvider, $urlRouterProvider) {

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

	var setPwdState = {
		name: 'setpwd',
		url: '/setpwd',
		views: {
			nav: {
				component: 'navigation'
			},
			main: {
				component: 'setPassword'
			}
		},
		resolve: {
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
	  var toolAdminState = {
			    name: 'tool-admin',
			    url: '/tool-admin',
			    views: {
			        nav: {
			    		component: 'navigation'
			    	},
			    	main: {
			    		component: 'toolAdmin',
                        // component: 'myProfile',
			    	}
			    },
			    resolve: {
			    	inverse: function() {
			    		return true;
			        }
			    }
	  }
	  var userAdminState = {
			    name: 'user-admin',
			    url: '/user-admin',
			    views: {
			        nav: {
			    		component: 'navigation'
			    	},
			    	main: {
			    		component: 'userAdmin',
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
			    url: '/profile/{userId}?token',
			    views: {
			    	nav: {
			    		component: 'navigation'
			    	},
			    	main: {
			    		component: 'myProfile',
			    	}
			    },
				resolve: {
					user: ['UserService', '$transition$', '$localStorage', function(UserService, $transition$, $localStorage) {
                        if ($transition$.params().token) {
                            $localStorage.token = $transition$.params().token
                        }
						return UserService.GetById($transition$.params().userId);
				    }],
				    inverse: function() {
				    	return true;
				    }
				}
	  }
	  var resetPwdState = {
			name: 'reset-pwd',
			url: '/reset-pwd?email',
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
			},
			lazyLoad: function ($transition$) {
			  var $ocLazyLoad = $transition$.injector().get('$ocLazyLoad');
			  return import(/* webpackPrefetch: true , webpackChunkName: "enrolment.module" */ './enrolment/enrolment.module.js')
				  // return System.import(/* webpackChunkName: "enrolment.module" */'./enrolment/enrolment.module.js')
				  .then(mod => $ocLazyLoad.load(mod.ENROLMENT_MODULE))
				  .catch(err => {
					  throw new Error("Ooops, something went wrong, " + err);
				  });
			}
	  }
    var homeFutureState = {
        name: 'home.**',
        url: '/home',
        lazyLoad: function ($transition$) {
            var $ocLazyLoad = $transition$.injector().get('$ocLazyLoad');
            return import(/* webpackPreload: true, webpackChunkName: "home.module" */'./home/home.module.js')
            // return System.import(/* webpackChunkName: "home.module" */'./home/home.module.js')
                .then(mod => $ocLazyLoad.load(mod.HOME_MODULE))
                .catch(err => {
                    throw new Error("Ooops, something went wrong, " + err);
                });
        }
    }
    var toolsFutureState = {
        name: 'tools.**',
        url: '/tools',
        // lazy load the tools module here
        lazyLoad: function ($transition$) {
            var $ocLazyLoad = $transition$.injector().get('$ocLazyLoad');
            return import(/* webpackPrefetch: true , webpackChunkName: "tools.module" */'./tools/tools.module.js')
            // return System.import(/* webpackChunkName: "tools.module" */'./tools/tools.module.js')
                .then(mod => $ocLazyLoad.load(mod.TOOLS_MODULE))
                .catch(err => {
                    throw new Error("Ooops, something went wrong, " + err);
                });
        }
    }

    var enrolmentFutureState = {
        name: 'enrolment.**',
        url: '/lid-worden',
        lazyLoad: function ($transition$) {
            var $ocLazyLoad = $transition$.injector().get('$ocLazyLoad');
			return import(/* webpackPrefetch: true , webpackChunkName: "enrolment.module" */ './enrolment/enrolment.module.js')
            // return System.import(/* webpackChunkName: "enrolment.module" */'./enrolment/enrolment.module.js')
                .then(mod => $ocLazyLoad.load(mod.ENROLMENT_MODULE))
                .catch(err => {
                    throw new Error("Ooops, something went wrong, " + err);
                });
        }
    }
    var volunteerFutureState = {
        name: 'volunteer.**',
        url: '/vrijwilligers',
        // lazy load the volunteer module here
        lazyLoad: function ($transition$) {
            var $ocLazyLoad = $transition$.injector().get('$ocLazyLoad');
			return import(/* webpackPrefetch: true , webpackChunkName: "volunteer.module" */ './volunteer/volunteer.module.js')
            // return System.import(/* webpackChunkName: "volunteer.module" */'./volunteer/volunteer.module.js')
				.then(mod => $ocLazyLoad.load(mod.VOLUNTEER_MODULE))
                .catch(err => {
                    throw new Error("Ooops, something went wrong, " + err);
                });
        }
	 }

	$stateProvider.state(homeFutureState);
	$stateProvider.state(signInState);
	$stateProvider.state(setPwdState);
    $stateProvider.state(consumersState);
    $stateProvider.state(reservationsState);
    $stateProvider.state(toolAdminState);
    $stateProvider.state(userAdminState);
    $stateProvider.state(profileState);
    $stateProvider.state(enrolmentFutureState);
    $stateProvider.state(resetPwdState);
    $stateProvider.state(toolsFutureState);
    $stateProvider.state(volunteerFutureState);

	$urlRouterProvider.otherwise('/home')
};


