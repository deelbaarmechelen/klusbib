AuthService.$inject = ['$http', '__env'];
export default function AuthService($http, __env) {
    var service = {};

    service.resetPwd = resetPwd;
    service.setPwd = setPwd;
    service.verifyEmail = verifyEmail;

    return service;

    function resetPwd (email, success, error) {
        var data = {"email": email };
        $http.post(__env.apiUrl + '/auth/reset', data).then(success,error);
    }
    function setPwd (token, userId, new_password, success, error) {
        var data = {"password" : new_password };
        var config = {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        }
        $http.put(__env.apiUrl + '/users/' + userId, data, config).then(success,error);
    }
    function verifyEmail(email) {
        var data = '{"email": "' + email + '"}';
        return $http.post(__env.apiUrl + '/auth/verifyemail', data).then(handleSuccess, handleError);
    }

    // private functions
    function handleSuccess(response) {
        return { success: true, message: response.data };
    }

    function handleError(response, error) {
        console.log(JSON.stringify(response));
        var data = response.data;
        var status = response.status;
        var statusText = response.statusText;
        var headers = response.headers;
        var config = response.config;
        var message = 'Er ging iets mis, probeer later eens opnieuw';
        if (status == 401) {
            message = 'Geen toegang. Gelieve eerst (opnieuw) in te loggen (' + data.error.message + ')';
        }
        console.log(message);
        return { 'success': false, 'message': message, 'status': status };
    }
}
