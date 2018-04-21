import angular from 'angular';
import toolList from '../components/tool-list/tool-list.module';
import toolDetail from '../components/tool-detail/tool-detail.module';
import routing from './tools.config';

const MODULE_NAME = 'tools';
export const TOOLS_MODULE = angular.module(MODULE_NAME, [toolList, toolDetail]);
TOOLS_MODULE.config(routing);

TOOLS_MODULE.controller('ToolsController', ToolsController);

function ToolsController() {
    var vm = this;

}

// TOOLS_MODULE.config(['$stateRegistryProvider', function($stateRegistry) {
//     $stateRegistry.register(contactsState);
//     $stateRegistry.register(newContactState);
//     $stateRegistry.register(viewContactState);
//     $stateRegistry.register(editContactState);
// }]);
// export default MODULE_NAME;
