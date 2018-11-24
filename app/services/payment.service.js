export default class PaymentService {
    // static get $inject() { return ['$http', '__env', '$localStorage']; }
    constructor($http, __env, $localStorage){
        this.$http = $http;
        this.__env = __env;
        this.$localStorage = $localStorage;
    }

    Create(paymentMode, userId, orderId, redirectUrl, paymentMean = false) {
        if (paymentMean) {
            var paymentData = {paymentMode: paymentMode, userId: userId, orderId: orderId, redirectUrl: redirectUrl, paymentMean: paymentMean};
        } else {
            var paymentData = {paymentMode: paymentMode, userId: userId, orderId: orderId, redirectUrl: redirectUrl};
        }
        return this.$http.post(this.__env.apiUrl + '/payments', paymentData)
            .then(this.handleSuccess, this.handleError);
    }

    Get(paymentId) {
        return this.$http.get(this.__env.apiUrl + '/payments/' + paymentId)
            .then(this.handleSuccess, this.handleError);

    }
    GetByOrderId(orderId) {
        return this.$http.get(this.__env.apiUrl + '/payments/' + orderId)
            .then(this.handleSuccess, this.handleError);

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

PaymentService.$inject = ['$http', '__env', '$localStorage'];
