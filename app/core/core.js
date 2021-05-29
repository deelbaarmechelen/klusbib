coreUtils.$inject = ['$localStorage', 'jwtHelper'];

export default function coreUtils($localStorage, jwtHelper) {
	var user = {id:null};

	function urlBase64Decode(str) {
		var output = str.replace('-', '+').replace('_', '/');
		switch (output.length % 4) {
			case 0:
				break;
			case 2:
				output += '==';
				break;
			case 3:
				output += '=';
				break;
			default:
				throw 'Illegal base64url string!';
		}
		return window.atob(output);
	}

	function getClaimsFromToken(token) {
		var tokenClaims = {};
		if (typeof token !== 'undefined') {
			var encoded = token.split('.')[1];
			tokenClaims = JSON.parse(urlBase64Decode(encoded));
		}
		return tokenClaims;
	}

	var updateUserFromToken = function () {
		var tokenClaims = getClaimsFromToken($localStorage.token);
		user.id = tokenClaims["sub"];
	}

	var tokenClaims = getClaimsFromToken($localStorage.token);
	user.id = tokenClaims["sub"];
	return {
		updateToken: function (token) {
			$localStorage.token = token;
			updateUserFromToken();
		},
		updateFromToken: updateUserFromToken,
		update: function (userId) {
			user.id = userId;
		},
		get: function () {
			return user;
		},
		validToken: function() {
			if (typeof $localStorage.token === 'undefined') {
				return false;
			}
			var isExpired = jwtHelper.isTokenExpired($localStorage.token);
			if (isExpired) {
				user.id = null;
				$localStorage.$reset();
			}
			return isExpired;
		},
		getUserIdFromToken: function(token) {
			var tokenClaims = getClaimsFromToken(token);
			return tokenClaims["sub"];
		},
		logout: function() {
			user.id = null;
			$localStorage.$reset();
		}
	};
};
