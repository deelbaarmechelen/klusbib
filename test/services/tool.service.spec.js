import ToolService from '../../app/services/tool.service.js';
describe("tool api service", function () {
    var toolService, httpBackend, __env;

    // beforeEach(module("toollibApp"));

    // When the $state service is loaded, UI-Router tries to load the default route,
    // and part of that process is fetching the default route's template.
    // If you are getting an unexpected GET for one of the templates of your default route, you should tell UI-Router to defer intercept of the URL.
    // This stops UI-Router from trying to synchronize the URL to the state,
    // thus skipping loading the default route/state.
    // See also https://github.com/angular-ui/ui-router/issues/212
    // beforeEach(module(function($urlRouterProvider) {
    //     $urlRouterProvider.deferIntercept();
    // }));

    beforeEach(inject(['$http', '$httpBackend', function ( $http, _$httpBackend_) {
        httpBackend = _$httpBackend_;
        __env = {apiUrl: 'http://localhost'};
        toolService = new ToolService($http,__env);
    }]));



    afterEach(function() {
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
    });

    // A simple test to verify the toolService factory exists
    it('should exist', function() {
        expect(toolService).toBeDefined();
    });
    it("should return all tools", function () {
        var responseData = [{"tool_id":1}];
        httpBackend.whenGET(__env.apiUrl + '/tools?_page=1&_perPage=100').respond(responseData);
        toolService.GetAll().then(function(response) {
            expect(response).toEqual({ success: true, message:responseData, totalCount:0});
        });
        httpBackend.flush();
    });
    it("should return failure for http code 500", function () {
        httpBackend.whenGET(__env.apiUrl + '/tools?_page=1&_perPage=100').respond(500, '');
        toolService.GetAll().then(function(response) {
            expect(response).toEqual({ success: false, message:'Er ging iets mis, probeer later eens opnieuw'});
        });
        httpBackend.flush();
    });
    it("should return unauthenticated for http code 401", function () {
        var errorMessage = 'unknown user';
        httpBackend.whenGET(__env.apiUrl + '/tools?_page=1&_perPage=100').respond(401,{message:errorMessage});
        toolService.GetAll().then(function(response) {
            expect(response).toEqual({ success: false, message:'Geen toegang. Gelieve eerst (opnieuw) in te loggen (' + errorMessage + ')'});
        });
        httpBackend.flush();
    });
    it("should get all tools ordered by code by default", function () {
        httpBackend.expectGET(__env.apiUrl + '/tools?_page=1&_perPage=100&_sortField=code&_sortDir=asc').respond(200, '');
        toolService.GetAllOrderBy().then(function(response) {
            expect(response).toEqual({ success: true, message:'', totalCount:0});
        });
        httpBackend.flush();
    });
    it("should get all tools from category", function () {
        httpBackend.expectGET(__env.apiUrl + '/tools?category=wood&_page=2&_perPage=20&_sortField=code&_sortDir=asc').respond(200, '');
        toolService.GetByCategoryOrderBy('wood', 2, 20).then(function(response) {
            expect(response).toEqual({ success: true, message:'', totalCount:0});
        });
        httpBackend.flush();
    });
    it("should get all tools ordered by name", function () {
        httpBackend.expectGET(__env.apiUrl + '/tools?_page=1&_perPage=20&_sortField=name&_sortDir=asc').respond(200, '');
        toolService.GetAllOrderBy(1,20,'name').then(function(response) {
            expect(response).toEqual({ success: true, message:'', totalCount:0});
        });
        httpBackend.flush();
    });
    it("should get tool by id", function () {
        httpBackend.expectGET(__env.apiUrl + '/tools/1').respond(200, '');
        toolService.GetById(1).then(function(response) {
            expect(response).toEqual({ success: true, message:'', totalCount:0});
        });
        httpBackend.flush();
    });
    // service.GetByUsername = GetByUsername;
    xit("should get tool by username", function () {
        httpBackend.expectGET(__env.apiUrl + '/tools?_perPage=100&filterUser=username').respond(200, '');
        toolService.GetByUsername('username').then(function(response) {
            expect(response).toEqual({ success: true, message:'', totalCount:0});
        });
        httpBackend.flush();
    });
    // service.Create = Create;
    it("should create tool", function () {
        var user = {id : 1, name: 'myname'};
        httpBackend.expectPOST(__env.apiUrl + '/tools').respond(201, '');
        toolService.Create(user).then(function(response) {
            expect(response).toEqual({ success: true, message:'', totalCount:0});
        });
        httpBackend.flush();
    });
    // service.Update = Update;
    it("should update tool", function () {
        var user = {tool_id : 1, name: 'mynewname'};
        httpBackend.expectPUT(__env.apiUrl + '/tools/1').respond(200, '');
        toolService.Update(user).then(function(response) {
            expect(response).toEqual({ success: true, message:'', totalCount:0});
        });
        httpBackend.flush();
    });

    it("should delete tool", function () {
        httpBackend.expectDELETE(__env.apiUrl + '/tools/1').respond(200, '');
        toolService.Delete(1).then(function(response) {
            expect(response).toEqual({ success: true, message:'', totalCount:0});
        });
        httpBackend.flush();
    });

});