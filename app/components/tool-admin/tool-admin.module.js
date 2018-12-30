import angular from 'angular';
import './tool-admin.component';
import ToolAdminController from "../tool-admin/tool-admin.component";
import '../../core/dirPagination';

angular.module('toolAdmin', [
   'angularUtils.directives.dirPagination'
]);
angular.module('toolAdmin').
component('toolAdmin', {
    // bindings: {tool: '<'},
    // template: require('./index_demo.html'),
    template: require('./tool-admin.template.html'),
    controller: ToolAdminController
});
export default angular.module('toolAdmin').name;