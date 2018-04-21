routing.$inject = ['$stateProvider'];

export default function routing($stateProvider) {
    var homeState = {
        name: 'home',
        views: {
            nav: {
                component: 'navigation',
            },
            main: {
                template: require('./home.view.html'),
                controller: 'HomeController'
//	    		css: 'home/css/creative.css'
            }
        },
        url: '/home',
        resolve: {
            transparant: function () {return true;},
            items: function () {
                var menuItems = [
                    {'label': 'Over ons', 'sref': "home({'#': 'about'})"},
                    {'label': 'Waar', 'sref': "home({'#': 'where'})"},
                    {'label': 'Contact', 'sref': "home({'#': 'contact'})"},
                    {'label': 'FAQ', 'sref': "home({'#': 'faq'})"}
                ];
                return menuItems;
            }
        }
    }
    $stateProvider.state(homeState);

}