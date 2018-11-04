// (function () {
//     'use strict';
//
//     angular
//         .module('toollibApp')
//         .controller('HomeController', HomeController);
// import ovam from './img/sponsor/ovam-logo.jpg';
// require("./img/sponsor/ovam-logo.jpg");

    HomeController.$inject = ['$scope', '$css'];

    export default function HomeController($scope, $css) {
        var vm = this;
    	
    	// add stylesheet(s)
		// no longer needed as loaded in app.module.js by webpack?
        // $css.add('./css/creative.css');

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
			    background: 'url(/home/img/Klusbib-potterij.jpg)'
		};
     }

// })();
