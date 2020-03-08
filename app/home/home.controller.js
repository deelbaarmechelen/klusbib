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

		$scope.map = {
			center : {
				lat: 51.022066,
				lng: 4.482764,
				zoom: 17
			},
			markers : {
				klusbibMarker: {
					lat: 51.022066,
					lng: 4.482764
				},
			}
		},
		$scope.defaults = {
			scrollWheelZoom: false
		}

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
