// (function () {
//     'use strict';
//
//     angular
//         .module('toollibApp')
//         .controller('HomeController', HomeController);
// import ovam from './img/sponsor/ovam-logo.jpg';
// require("./img/sponsor/ovam-logo.jpg");

    HomeController.$inject = ['$scope', '$css'];

    export default function HomeController($scope, $css,) {
        var vm = this;
    	
    	// add stylesheet(s)
		// no longer needed as loaded in app.module.js by webpack?
        // $css.add('./css/creative.css');
		// speecqvest: 51.02156,4.48496
		// 2 markers op de kaart plaatsen?

		$scope.map = {
			center : {
				lat: 51.022066,
				lng: 4.482764,
				zoom: 17
			},
			markers : {
				speecqvestMarker: {
					lat: 51.02156,
					lng: 4.48496,
					message: "Speecqvest 11"
				},
			}
		};
		$scope.defaults = {
			scrollWheelZoom: false
		};

		$scope.address = 'Speecqvest 11 te Mechelen';

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
