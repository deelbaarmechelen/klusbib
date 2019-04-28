export default class ToolService{
    constructor($http, __env, Upload) {
        this.$http = $http;
        this.__env = __env;
        this.Upload  = Upload;
        this.defaultPageSize = 100;
    }

   GetAll(page, perPage) {
        page = typeof page !== 'undefined' ? page : 1;
        perPage = typeof perPage !== 'undefined' ? perPage : this.defaultPageSize;
        return this.$http.get(this.__env.apiUrl + '/tools?_page=' + page + '&_perPage=' + perPage).then(this.handleSuccess, this.handleError);
    }
    GetAllOrderBy(page, perPage, sortField, direction) {
        page = typeof page !== 'undefined' ? page : 1;
        perPage = typeof perPage !== 'undefined' ? perPage : this.defaultPageSize;
        sortField = typeof sortField !== 'undefined' ? sortField : 'code';
        direction = typeof direction !== 'undefined' ? direction : 'asc';
        return this.$http.get(this.__env.apiUrl + '/tools?_page=' + page + '&_perPage=' + perPage + '&_sortField=' + sortField + '&_sortDir=' + direction)
            .then(this.handleSuccess, this.handleError);
    }
    GetByCategoryOrderBy(category, page, perPage, sortField, direction) {
        page = typeof page !== 'undefined' ? page : 1;
        perPage = typeof perPage !== 'undefined' ? perPage : this.defaultPageSize;
        sortField = typeof sortField !== 'undefined' ? sortField : 'code';
        direction = typeof direction !== 'undefined' ? direction : 'asc';
        return this.$http.get(this.__env.apiUrl + '/tools?category=' + category + '&_page=' + page + '&_perPage=' + perPage + '&_sortField=' + sortField + '&_sortDir=' + direction)
            .then(this.handleSuccess, this.handleError);
    }

    GetById(id) {
        console.log ('called GetById for id ' + id);
        return this.$http.get(this.__env.apiUrl + '/tools/' + id).then(this.handleSuccess, this.handleError);
    }

    GetByUsername(username) {
        return this.$http.get(this.__env.apiUrl + '/tools/' + username).then(this.handleSuccess, this.handleError);
    }

    Create(user, token) {
        console.log('User data: ' + JSON.stringify(user));
        var config = {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
        }
        return this.$http.post(this.__env.apiUrl + '/tools', user, config)
            .then(this.handleSuccess, this.handleError);
    }

    Update(tool) {
        return this.$http.put(this.__env.apiUrl + '/tools/' + tool.tool_id, tool)
            .then(this.handleSuccess, this.handleError);
    }

    UploadImage(tool, files) {
        return this.Upload.upload(
            {
                url: this.__env.apiUrl + '/tools/' + tool.tool_id + '/upload', method: 'POST',
                data: {newfile: files[0]}
            }
        ).then(this.handleSuccess, this.handleError);

     }

    Delete(id) {
        return this.$http.delete(this.__env.apiUrl + '/tools/' + id)
            .then(this.handleSuccess, this.handleError);
    }

    // private functions
    handleSuccess(response) {
        var totalCount = parseInt(response.headers('X-Total-Count')) || 0;
        return { success: true, message: response.data, totalCount: totalCount };
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
};
ToolService.$inject = ['$http', '__env', 'Upload'];
