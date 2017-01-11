describe('toolList', function() {

	// Load the module that contains the `toolList` component before each test
	beforeEach(module('toolList'));


	// Test the controller
	describe('ToolListController', function() {
	  var $httpBackend, ctrl;
	  
	  // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
	  // This allows us to inject a service and assign it to a variable with the same name
	  // as the service while avoiding a name conflict.
	  beforeEach(inject(function($componentController, _$httpBackend_) {
		  $httpBackend = _$httpBackend_;
		  $httpBackend.expectGET('data/tools/tools.json')
		  .respond([{name: 'Cirkelzaag'}, {name: 'hamer'}]);
		  
		  ctrl = $componentController('toolList');
	  }));

	  it('should create a `tools` property with 2 tools fetched with `$http`', function() {
		  expect(ctrl.tools).toBeUndefined();

		  $httpBackend.flush();
		  expect(ctrl.tools).toEqual([{name: 'Cirkelzaag'}, {name: 'hamer'}]);
	  });

	  it('should translate category in human readable name', function() {

		  expect(ctrl.translateCategory('wood')).toEqual('Hout');
		  expect(ctrl.translateCategory('electricity')).toEqual('Elektriciteit');
		  expect(ctrl.translateCategory('construction')).toEqual('Bouw');
		  // when no translation available, keep category name
		  expect(ctrl.translateCategory('unknown')).toEqual('unknown');
	  });
	});

});