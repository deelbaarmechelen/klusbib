TokenService.$inject = ['$http', '__env'];
export default function TokenService($http, __env) {
    var service = {};

    service.GetGuestToken = GetGuestToken;

    return service;

    function GetGuestToken(success) {
        return $http.post(__env.apiUrl + '/token/guest').then(success, handleError('Error getting guest token'));
    }

    // private functions

    function handleSuccess(res) {
        return res.data;
    }

    function handleError(error) {
        return function () {
            return { success: false, message: error };
        };
    }
};