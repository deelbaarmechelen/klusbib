import angular from 'angular';
import './tool-admin.component';
import ToolAdminController from "../tool-admin/tool-admin.component";
import './dirPagination';
import 'ng-droplet';
import 'ng-file-upload';

angular.module('toolAdmin', [
   'angularUtils.directives.dirPagination',
    'ngDroplet',
    'ngFileUpload'
]);
angular.module('toolAdmin').
component('toolAdmin', {
    // bindings: {tool: '<'},
    template: require('./tool-admin.template.html'),
    controller: ToolAdminController
});
export default angular.module('toolAdmin').name;