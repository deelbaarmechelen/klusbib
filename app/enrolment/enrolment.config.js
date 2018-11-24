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
        data: {
            user: {}
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
    var enrolmentConfirmState = {
        name: 'enrolment.confirm',
        url: '/confirm/:orderId',
        views: {
            enrolment: {
                template: require('./enrolment.confirm.view.html'),
                controller: 'EnrolmentConfirmController as vm'
            }
        },
        resolve: {
            inverse: function() {
                return true;
            }
        }
    }
    var enrolmentResumeState = {
        name: 'enrolment.resume',
        url: '/resume?email',
        views: {
            enrolment: {
                template: require('./enrolment.resume.view.html'),
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
    $stateProvider.state(enrolmentConfirmState);
    $stateProvider.state(enrolmentResumeState);

}