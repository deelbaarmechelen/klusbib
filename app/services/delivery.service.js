export default class DeliveryService {
    constructor($http, __env, $localStorage){
        this.$http = $http;
        this.__env = __env;
        this.$localStorage = $localStorage;
        this.moment = require('moment');
    }

    GetAll() {
        return this.$http.get(this.__env.apiUrl + '/deliveries').then(this.handleSuccess, this.handleError);
    }
    GetOpen() {
        return this.$http.get(this.__env.apiUrl + '/deliveries?isOpen=true').then(this.handleSuccess, this.handleError);
    }
    GetAllByPage(page, pageSize) {
        return this.$http.get(this.__env.apiUrl + '/deliveries?_perPage='+pageSize).then(this.handleSuccess, this.handleError);
    }
    GetOpenByPage(page, pageSize) {
        return this.$http.get(this.__env.apiUrl + '/deliveries?isOpen=true&_perPage='+pageSize).then(this.handleSuccess, this.handleError);
    }
//
//        function GetById(id) {
//            return $http.get(__env.apiUrl + '/deliveries/' + id).then(this.handleSuccess, this.handleError('Error getting delivery by id'));
//        }
    /*{
        "user_id" : 1,
        "state" : "REQUESTED",
        "pick_up_address": "potterij",
        "drop_off_address" : "there",
        "drop_off_date" : "2020-10-26"
    }*/
    Create(deliveryData, userId) {
        var delivery = {'user_id' : userId,
            'state' : deliveryData.state,
            'type' : deliveryData.type,
            'comment' : deliveryData.comment,
            'pick_up_date': deliveryData.pick_up_date,
            'pick_up_address': deliveryData.pick_up_address,
            'drop_off_date' : deliveryData.drop_off_date,
            'drop_off_address': deliveryData.drop_off_address,
            'consumers': deliveryData.consumers,
            'items': deliveryData.items
        };
        console.log('Delivery data: ' + JSON.stringify(delivery));
        var config = {
                headers: {
                    'Authorization': 'Bearer ' + this.$localStorage.token
                }
        }
        return this.$http.post(this.__env.apiUrl + '/deliveries', delivery, config)
            .then(this.handleSuccess, this.handleError);
    }

    Cancel(delivery) {
        // FIXME: cancel updates state or triggers delete instead?
        delivery.state = 'CANCELLED';
        return this.Update(delivery);

    }
    Update(delivery) {
        return this.$http.put(this.__env.apiUrl + '/deliveries/' + delivery.id, delivery)
            .then(this.handleSuccess, this.handleError);
    }

    Delete(id) {
        return this.$http.delete(this.__env.apiUrl + '/deliveries/' + id).then(this.handleSuccess, this.handleError);
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

DeliveryService.$inject = ['$http', '__env', '$localStorage'];
