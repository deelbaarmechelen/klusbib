volunteerRouting.$inject = ['$stateProvider'];

export default function volunteerRouting($stateProvider) {
    var volunteerState = {
        name: 'volunteer',
        url: '/vrijwilligers',
        views: {
            nav: {
                component: 'navigation'
            },
            main: {
                template: require('./volunteer.view.html').default,
                controller: 'VolunteerController'
            }
        },
        resolve: {
            inverse: function () {
                return true;
            }
        }
    }
    $stateProvider.state(volunteerState);
}