(function () {
    'use strict';

    angular
        .module('toollibApp')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$scope', '$css'];

    function HomeController($scope, $css) {
    	var vm = this;
    	
    	// add stylesheet(s)
    	$css.add('home/css/creative.css');

    	$scope.map = { 
   			center: { latitude: 51.022066, longitude: 4.482764 }, 
   			zoom: 17 
    	};
    	$scope.marker = {
			id: 0,
			coords: {
				latitude: 51.022066,
				longitude: 4.482764
			},
			options: { draggable: true }
    	};
    	
		$scope.menuItems = [
			{'label': 'Over ons', 'href': '/#!/#about'}, 
			{'label': 'Waar', 'href': '/#!/#where'},
			{'label': 'Contact', 'href': '/#!/#contact'},
			{'label': 'FAQ', 'href': '/#!/#faq'}
		];
		$scope.headerImage = {
			    background: 'url(/home/img/vitrine.jpg)'
		};
     }

})();
