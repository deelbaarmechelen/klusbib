import coreUtils from "../../core/core";

signInFactory.$inject = ['$http', '$localStorage', '__env', '$location'];

export default function signInFactory($http, $localStorage, __env, $location) {
    let baseUrl = $location.protocol() + '://' + $location.host() + ($location.port() ? (':' + $location.port()) : '');
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
            $http.post(__env.apiUrl + '/token', data, {headers: headers, cache: false}).then(success,error);
        },
        signout: function (success) {
        	$localStorage.$reset();
//            delete $localStorage.token;
            success();
        },
        resetPwd: function (email, success, error) {
            var data = {"email": email, "redirect_url": baseUrl + '/#!/setpwd' };
            console.log(data);
            $http.post(__env.apiUrl + '/auth/reset', data).then(success,error);
        },
        getTokenClaims: function () {
        	tokenClaims = getClaimsFromToken();
            return tokenClaims;
        }
    };
};
