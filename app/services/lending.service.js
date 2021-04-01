const endpoint = '/lendings';
export default class LendingService {
    constructor($http, __env, $localStorage){
        this.$http = $http;
        this.__env = __env;
        this.$localStorage = $localStorage;
        this.moment = require('moment');
    }

    GetAll() {
        return this.$http.get(this.__env.apiUrl + endpoint).then(this.handleSuccess, this.handleError);
    }
    GetActiveByUser(userId) {
        return this.$http.get(this.__env.apiUrl + endpoint + '?active=true&_expandUser=true&_expandTool=true&user_id=' + userId).then(this.handleSuccess, this.handleError);
    }
    GetAllByPage(page, pageSize) {
        return this.$http.get(this.__env.apiUrl + endpoint + '?_perPage='+pageSize).then(this.handleSuccess, this.handleError);
    }
    GetByUserByPage(userId, page, pageSize) {
        return this.$http.get(this.__env.apiUrl + endpoint + '?user_id='+userId+'&_perPage='+pageSize).then(this.handleSuccess, this.handleError);
    }

    Extend(lending) {

    }

    // private functions
    handleSuccess(response) {
        return { success: true, message: response.data };
    }

    // function (data, status, headers, config)??
    handleError(response, error) {
        console.log(JSON.stringify(response));
        var data = response.data;
        var status = response.status;
        var statusText = response.statusText;
        var headers = response.headers;
        var config = response.config;
        var message = 'Er ging iets mis, probeer later eens opnieuw';
        if (status == 401) {
            message = 'Geen toegang. Gelieve eerst (opnieuw) in te loggen (' + data.message + ')';
        }
        console.log(message);
        return { success: false, message: message };
    }
}

LendingService.$inject = ['$http', '__env', '$localStorage'];
