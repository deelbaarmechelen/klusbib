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
    var homeFutureState = {
        name: 'home.**',
        url: '/home',
        lazyLoad: function ($transition$) {
            var $ocLazyLoad = $transition$.injector().get('$ocLazyLoad');
            return System.import(/* webpackChunkName: "home.module" */'./home/home.module.js')
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
            return System.import(/* webpackChunkName: "tools.module" */'./tools/tools.module.js')
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
            return System.import(/* webpackChunkName: "enrolment.module" */'./enrolment/enrolment.module.js')
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
            return System.import(/* webpackChunkName: "volunteer.module" */'./volunteer/volunteer.module.js')
				.then(mod => $ocLazyLoad.load(mod.VOLUNTEER_MODULE))
                .catch(err => {
                    throw new Error("Ooops, something went wrong, " + err);
                });
        }
	 }

	$stateProvider.state(homeFutureState);
	$stateProvider.state(signInState);
    $stateProvider.state(consumersState);
    $stateProvider.state(reservationsState);
    $stateProvider.state(profileState);
    $stateProvider.state(enrolmentFutureState);
    $stateProvider.state(resetPwdState);
    $stateProvider.state(toolsFutureState);
    $stateProvider.state(volunteerFutureState);

	$urlRouterProvider.otherwise('/home')
};


