// This file should handle routes configuration
routing.$inject = ['$stateProvider', '$urlRouterProvider'];

export default function routing($stateProvider, $urlRouterProvider) {

    var homeState = {
        name: 'home.**',
        url: '/home',
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
            inverse: function () {
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
            inverse: function () {
                return true;
            }
        }
    }
    var reservationsFutureState = {
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
            inverse: function () {
                return true;
            }
        },
        lazyLoad: function ($transition$) {
            var $ocLazyLoad = $transition$.injector().get('$ocLazyLoad');
            return import(/* webpackChunkName: "reservation-list.module" */ './components/reservation-list/reservation-list.module.js')
                .then(mod => $ocLazyLoad.load(mod.RESERVATION-LIST_MODULE))
                .catch(err => {
                    throw new Error("Ooops, something went wrong, " + err);
                });
        }
    }
    var toolAdminFutureState = {
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
            inverse: function () {
                return true;
            }
        },
		lazyLoad: function ($transition$) {
			var $ocLazyLoad = $transition$.injector().get('$ocLazyLoad');
			return import(/* webpackChunkName: "tool-admin.module" */ './components/tool-admin/tool-admin.module.js')
				.then(mod => $ocLazyLoad.load(mod.TOOL-ADMIN_MODULE))
				.catch(err => {
					throw new Error("Ooops, something went wrong, " + err);
				});
		}
    }
    var userAdminFutureState = {
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
            inverse: function () {
                return true;
            }
        },
		lazyLoad: function ($transition$) {
			var $ocLazyLoad = $transition$.injector().get('$ocLazyLoad');
			return import(/* webpackChunkName: "user-admin.module" */ './components/user-admin/user-admin.module.js')
				.then(mod => $ocLazyLoad.load(mod.USER-ADMIN_MODULE))
				.catch(err => {
					throw new Error("Ooops, something went wrong, " + err);
				});
		}
    }
    var profileFutureState = {
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
            user: ['UserService', '$transition$', '$localStorage', function (UserService, $transition$, $localStorage) {
                if ($transition$.params().token) {
                    $localStorage.token = $transition$.params().token
                }
                return UserService.GetById($transition$.params().userId);
            }],
            inverse: function () {
                return true;
            }
        },
        lazyLoad: function ($transition$) {
            var $ocLazyLoad = $transition$.injector().get('$ocLazyLoad');
            return import(/* webpackPrefetch: true , webpackChunkName: "my-profile.module" */'./components/my-profile/my-profile.module.js')
                .then(mod => $ocLazyLoad.load(mod.MY-PROFILE_MODULE))
                .catch(err => {
                    throw new Error("Ooops, something went wrong, " + err);
                });
        }
    }
    var resetPwdFutureState = {
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
            inverse: function () {
                return true;
            }
        },
        lazyLoad: function ($transition$) {
            var $ocLazyLoad = $transition$.injector().get('$ocLazyLoad');
            return import(/* webpackChunkName: "enrolment.module" */ './enrolment/enrolment.module.js')
                .then(mod => $ocLazyLoad.load(mod.ENROLMENT_MODULE))
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
                .then(mod => $ocLazyLoad.load(mod.ENROLMENT_MODULE))
                .catch(err => {
                    throw new Error("Ooops, something went wrong, " + err);
                });
        }
    }

    $stateProvider.state(homeState);
    $stateProvider.state(signInState);
    $stateProvider.state(setPwdState);
    $stateProvider.state(reservationsFutureState);
    $stateProvider.state(toolAdminFutureState);
    $stateProvider.state(userAdminFutureState);
    $stateProvider.state(profileFutureState);
    $stateProvider.state(enrolmentFutureState);
    $stateProvider.state(resetPwdFutureState);
    $stateProvider.state(toolsFutureState);

    $urlRouterProvider.otherwise('/home')
};


