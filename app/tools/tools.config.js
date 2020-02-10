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
        params: {category: 'all', page: '1', query: null},
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
            // FIXME: $stateparams deprecation - https://ui-router.github.io/guide/ng1/migrate-to-1_0#stateparams-deprecation
            query: ['$stateParams', function($stateParams) {
                return $stateParams.query || null;
            }],
            toolsData: ['ToolService','category', 'currentPage', 'pageSize', 'query', function(ToolService, category, currentPage, pageSize, query) {
                let sortField;
                let direction;
                return ToolService.GetByCategoryAnqQueryOrderBy(category, currentPage, pageSize, sortField, direction,query).then(function(response) {
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