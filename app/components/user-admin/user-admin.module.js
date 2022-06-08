import angular from 'angular';
// import './user-admin.component';
import UserAdminController from "../user-admin/user-admin.component";
import '../../core/dirPagination';

angular.module('userAdmin', [
   'angularUtils.directives.dirPagination'
]);
angular.module('userAdmin').
component('userAdmin', {
    // bindings: {user: '<'},
    template: require('./user-admin.template.html').default,
    controller: UserAdminController
});
export default angular.module('userAdmin').name;