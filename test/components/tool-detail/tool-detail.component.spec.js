describe('toolDetail', function() {

	// Load the module that contains the `toolList` component before each test
	beforeEach(angular.mock.module('mwl.calendar'));
	beforeEach(module('toolDetail'));


	// Test the controller
	describe('ToolDetailController', function() {
	  var $httpBackend, ctrl;
	  
	  // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
	  // This allows us to inject a service and assign it to a variable with the same name
	  // as the service while avoiding a name conflict.
	  beforeEach(inject(function($componentController, _$httpBackend_, $routeParams) {
		  $httpBackend = _$httpBackend_;
		  $httpBackend.expectGET('data/tools/wood-1.json')
		  .respond({ "id": "wood-1", "name": "wipzaag", "description": "Simpele wipzaag",
			  "link": null,  "category": "wood", "img": "dummy.jpg"
			  });
		  $routeParams.toolId = 'wood-1';
		  ctrl = $componentController('toolDetail');
	  }));

	  it('should create a `tool` property fetched with `$http`', function() {
		  expect(ctrl.tool).toBeUndefined();

		  $httpBackend.flush();
		  expect(ctrl.tool.id).toEqual('wood-1');
		  expect(ctrl.tool.name).toEqual('wipzaag');
		  expect(ctrl.tool.description).toEqual('Simpele wipzaag');
		  expect(ctrl.tool.category).toEqual('wood');
	  });
	  
	  // Test calendar
	  describe('ToolDetailCalendar', function() {
		  
		  it('should show calendar by month', function () {
			  expect(ctrl.calendarView).toEqual('month');
		  });
		  it('should create an event', function () {
			  var emptyEvents = [];
			  expect(ctrl.events).toEqual(emptyEvents);
			  
			  ctrl.addEvent();
			  expect(ctrl.events[0]).toEqual(jasmine.objectContaining({title: 'Reserved'}));
			  // check new event is full week
			  
		  });
	  });
	});
	

});