routing.$inject = ['$stateProvider'];

export default function routing($stateProvider) {
    var enrolmentState = {
        name: 'enrolment',
        url: '/lid-worden',
        views: {
            nav: {
                component: 'navigation'
            },
            main: {
                template: require('./enrolment.view.html'),
                controller: 'EnrolmentController as vm'
            }
        },
        resolve: {
            inverse: function() {
                return true;
            }
        },
        redirectTo: 'enrolment.form'
    }
    var enrolmentFormState = {
        name: 'enrolment.form',
        url: '/form',
        views: {
            enrolment: {
                template: require('./enrolment.form.view.html'),
                controller: 'EnrolmentController as vm'
            }
        },
        resolve: {
            inverse: function() {
                return true;
            }
        }
    }
    var enrolmentPaymentState = {
        name: 'enrolment.payment',
        url: '/payment',
        views: {
            enrolment: {
                template: require('./enrolment.payment.view.html'),
                controller: 'EnrolmentController as vm'
            }
        },
        resolve: {
            inverse: function() {
                return true;
            }
        }
    }
    var enrolmentSuccessState = {
        name: 'enrolment.success',
        url: '/success',
        views: {
            enrolment: {
                template: require('./enrolment.success.view.html'),
                controller: 'EnrolmentController as vm'
            }
        },
        resolve: {
            inverse: function() {
                return true;
            }
        }
    }
    var enrolmentFailedState = {
        name: 'enrolment.failed',
        url: '/failed',
        views: {
            enrolment: {
                template: require('./enrolment.failed.view.html'),
                controller: 'EnrolmentController as vm'
            }
        },
        resolve: {
            inverse: function() {
                return true;
            }
        }
    }
    $stateProvider.state(enrolmentState);
    $stateProvider.state(enrolmentFormState);
    $stateProvider.state(enrolmentPaymentState);
    $stateProvider.state(enrolmentSuccessState);
    $stateProvider.state(enrolmentFailedState);

}