appSignin.factory('Auth', ['$http', '$localStorage', '__env',
	function ($http, $localStorage, __env) {

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
    
    function getClaimsFromToken() {
        var token = $localStorage.token;
        var user = {};
        if (typeof token !== 'undefined') {
            var encoded = token.split('.')[1];
            user = JSON.parse(urlBase64Decode(encoded));
        }
        return user;
    }

    var tokenClaims = getClaimsFromToken();
    
    return {
        signin: function (login, password, success, error) {
//        	delete $localStorage.token;
        	$localStorage.$reset();
        	var auth = btoa(login + ":" + password), 
            	headers = {"Authorization": "Basic " + auth};
        	var data = '["tools.all", "users.all", "reservations.all", "consumers.all"]';
            $http.post(__env.apiUrl + '/token', data, {headers: headers}).then(success,error)
        },
        signout: function (success) {
        	$localStorage.$reset();
//            delete $localStorage.token;
            success();
        },
        getTokenClaims: function () {
        	tokenClaims = getClaimsFromToken();
            return tokenClaims;
        }
    };
}
]);
