routing.$inject = ['$stateProvider'];

export default function routing($stateProvider) {
    var toolsListState = {
        name: 'tools',
        url: '/tools/category/{category}/page/{page}',
        views: {
            nav: {
                component: 'navigation'
            },
            main: {
                component: 'toolList',
            }
        },
        params: {category: 'general', page: '1'},
        resolve: {
            inverse: function() {
                return true;
            },
            category: ['$stateParams', function($stateParams) {
                return $stateParams.category;
            }],
            currentPage: ['$stateParams', function($stateParams) {
                return parseInt($stateParams.page) || 1;
            }],
            pageSize: function() {
                return 25;
            },
            toolsData: ['ToolService','category', 'currentPage', 'pageSize', function(ToolService, category, currentPage, pageSize) {
                return ToolService.GetByCategoryOrderBy(category, currentPage, pageSize).then(function(response) {
                    if (response.success) {
                        console.log('Total count:' + response.totalCount);
                        return {tools: response.message, count:response.totalCount};
                    }
                });
            }],
            tools: ['toolsData', function (toolsData) {
                return toolsData.tools;
            }],
            totalCount: ['toolsData', function(toolsData) {
                return toolsData.count;
            }]
        }
    }
    var toolDetailState = {
        name: 'toolDetail',
        url: '/tools/{toolId}',
        views: {
            nav: {
                component: 'navigation'
            },
            main: {
                component: 'toolDetail',
            }
        },
        resolve: {
            tool: ['ToolService', '$transition$', function (ToolService, $transition$) {
                return ToolService.GetById($transition$.params().toolId).then(function (response) {
                    if (response.success) {
                        return response.message;
                    }
                });
            }],
            inverse: function () {
                return true;
            }
        }
    }
    $stateProvider.state(toolsListState);
    $stateProvider.state(toolDetailState);
}