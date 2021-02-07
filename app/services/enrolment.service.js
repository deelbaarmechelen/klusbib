export default class EnrolmentService {
    constructor($http, __env, $localStorage){
        this.$http = $http;
        this.__env = __env;
        this.$localStorage = $localStorage;
    }

    Enrolment(paymentMode, userId, orderId, redirectUrl, paymentMean = false) {
        let paymentCompleted = 'false';
        if (paymentMode == "TRANSFER_DONE") {
            paymentCompleted = 'true';
            paymentMode = "TRANSFER";
        }
        let paymentData;
        if (paymentMean) {
            paymentData = {paymentMode: paymentMode, userId: userId, orderId: orderId,
                redirectUrl: redirectUrl, paymentMean: paymentMean, paymentCompleted: paymentCompleted};
        } else {
            paymentData = {paymentMode: paymentMode, userId: userId, orderId: orderId,
                redirectUrl: redirectUrl, paymentCompleted: paymentCompleted};
        }
        return this.$http.post(this.__env.apiUrl + '/enrolment', paymentData)
            .then(this.handleSuccess, this.handleError);
    }

    Renewal(paymentMode, userId, orderId, redirectUrl, paymentMean = false) {
        let paymentCompleted = 'false';
        if (paymentMode == "TRANSFER_DONE") {
            paymentCompleted = 'true';
            paymentMode = "TRANSFER";
        }
        let paymentData;
        if (paymentMean) {
            paymentData = {renewal: true, paymentMode: paymentMode, userId: userId,
                orderId: orderId, redirectUrl: redirectUrl, paymentMean: paymentMean, paymentCompleted: paymentCompleted};
        } else {
            paymentData = {renewal: true, paymentMode: paymentMode, userId: userId,
                orderId: orderId, redirectUrl: redirectUrl, paymentCompleted: paymentCompleted};
        }
        return this.$http.post(this.__env.apiUrl + '/enrolment', paymentData)
            .then(this.handleSuccess, this.handleError);
    }
    ConfirmEnrolmentPayment(paymentMode, userId) {
        var paymentData = {paymentMode: paymentMode, userId: userId};
        return this.$http.post(this.__env.apiUrl + '/enrolment_confirm', paymentData)
            .then(this.handleSuccess, this.handleError);
    }

    DeclineEnrolmentPayment(paymentMode, userId) {
        var paymentData = {paymentMode: paymentMode, userId: userId};
        return this.$http.post(this.__env.apiUrl + '/enrolment_decline', paymentData)
            .then(this.handleSuccess, this.handleError);
    }

    // private functions
    handleSuccess(response) {
        return { success: true, message: response.data , status: response.status};
    }

    // function (data, status, headers, config)??
    handleError(response, error) {
        console.log(JSON.stringify(response));
        var data = response.data;
        var reason = data.message ? data.message : data;
        var status = response.status;
        var statusText = response.statusText;
        var headers = response.headers;
        var config = response.config;
        var message = 'Er ging iets mis, probeer later eens opnieuw (' + reason + ')';

        console.log(message);
        return { success: false, message: message };
    }
}

EnrolmentService.$inject = ['$http', '__env', '$localStorage'];
