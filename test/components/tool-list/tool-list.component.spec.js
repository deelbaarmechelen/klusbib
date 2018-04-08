describe('toolList', function() {
    var __env, localStorage;

	// Load the module that contains the `toolList` component before each test
	beforeEach(module('toolList'));

    beforeEach(function() {

        module(function ($provide) {
            $provide.service('$localStorage', function () {
                // this.alert = jasmine.createSpy('alert');
            });
            $provide.service('User', function () {
                var user = {id:null};
                this.get = function () {return user;};
            });
            $provide.constant('__env', function () {

            });
            $provide.service('$stateParams', function () {

            });
            $provide.service('$state', function () {

            });
            $provide.factory('UserService', function($q) {
                var getById = jasmine.createSpy('GetById').and.callFake(function() {
                    var items = [];
                    var passPromise = true;
                    if (passPromise) {
                        return $q.when(items);
                    }
                    else {
                        return $q.reject('something went wrong');
                    }
                });

                return {
                    GetById: getById
                };
            });
        });
    });

	// Test the controller
	describe('ToolListController', function() {
        var $httpBackend, ctrl, $localStorage, User, UserService, __env_, $stateParams;

        // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
        // This allows us to inject a service and assign it to a variable with the same name
        // as the service while avoiding a name conflict.
        beforeEach(inject(function($componentController, _$httpBackend_, _$localStorage_, _User_, _UserService_, ___env_, _$stateParams_) {
          $httpBackend = _$httpBackend_;
          $httpBackend.expectGET('data/tools/tools.json')
          .respond([{name: 'Cirkelzaag'}, {name: 'hamer'}]);

          ctrl = $componentController('toolList', null, {
              // tools: 'tools',
              category: 'construction'
          });
          $localStorage = _$localStorage_;
          User = _User_;
          UserService = _UserService_;
          __env = ___env_;
          $stateParams = _$stateParams_;
        }));

        xit('should create a `tools` property with 2 tools fetched with `$http`', function() {
            // Moved to router-ui -> how to test?
            expect(ctrl.tools).toBeUndefined();

		    $httpBackend.flush();
		    expect(ctrl.tools).toEqual([{name: 'Cirkelzaag'}, {name: 'hamer'}]);
        });

        it('should define newTool method', function() {
            expect(ctrl.newTool).toBeDefined();
        });
        it('should define deleteTool method', function() {
            expect(ctrl.deleteTool).toBeDefined();
        });

	    it('should translate category in human readable name', function() {
          expect(ctrl.translateCategory).toBeDefined();
		  expect(ctrl.translateCategory('wood')).toEqual('Schrijnwerk');
		  expect(ctrl.translateCategory('technics')).toEqual('Technieken');
		  expect(ctrl.translateCategory('construction')).toEqual('Bouw');
          expect(ctrl.translateCategory('general')).toEqual('Algemeen');
		  // when no translation available, keep category name
		  expect(ctrl.translateCategory('unknown')).toEqual('unknown');
	    });
	});

});