"use strict";

describe("reservation api service", function () {
    var reservationService, httpBackend, __env, localStorageBackend;

    beforeEach(module("toollibApp"));
    // beforeEach(angular.mock.module('toollibApp'));

    // When the $state service is loaded, UI-Router tries to load the default route,
    // and part of that process is fetching the default route's template.
    // If you are getting an unexpected GET for one of the templates of your default route, you should tell UI-Router to defer intercept of the URL.
    // This stops UI-Router from trying to synchronize the URL to the state,
    // thus skipping loading the default route/state.
    // See also https://github.com/angular-ui/ui-router/issues/212
    beforeEach(module(function($urlRouterProvider) {
        $urlRouterProvider.deferIntercept();
    }));

    beforeEach(inject(function ( _ReservationService_, $httpBackend, $localStorage, ___env_) {
        reservationService = _ReservationService_;
        httpBackend = $httpBackend;
        __env = ___env_;
        localStorageBackend = $localStorage;
    }));



    afterEach(function() {
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
    });

    // httpBackend.whenGET(__env.apiUrl + '/reservations').respond(
    //     [{"reservation_id":1,"tool_id":1,"user_id":0,"title":"onderhoud","startsAt":"2017-02-15","endsAt":"2017-04-01","type":"maintenance","state":"REQUESTED","comment":null},
    //         {"reservation_id":2,"tool_id":1,"user_id":0,"title":"onderhoud","startsAt":"2017-03-01","endsAt":"2017-04-01","type":"maintenance","state":"REQUESTED","comment":null},
    //         {"reservation_id":4,"tool_id":37,"user_id":5,"title":"Herstelling","startsAt":"2017-08-25","endsAt":"2017-09-29","type":"maintenance","state":"REQUESTED","comment":null},
    //         {"reservation_id":5,"tool_id":58,"user_id":3,"title":"Reservatie","startsAt":"2017-04-14","endsAt":"2017-04-21","type":"loan","state":"CONFIRMED","comment":null},
    //         {"reservation_id":6,"tool_id":44,"user_id":15,"title":"Reservatie","startsAt":"2017-04-01","endsAt":"2017-04-08","type":"loan","state":"CONFIRMED","comment":null},
    //         {"reservation_id":7,"tool_id":33,"user_id":19,"title":"Reservatie","startsAt":"2017-04-07","endsAt":"2017-04-14","type":"loan","state":"CONFIRMED","comment":null},
    //         {"reservation_id":8,"tool_id":34,"user_id":17,"title":"Reservatie","startsAt":"2017-04-03","endsAt":"2017-04-10","type":"loan","state":"CONFIRMED","comment":null},
    //         {"reservation_id":9,"tool_id":10,"user_id":24,"title":"Reservatie","startsAt":"2017-04-10","endsAt":"2017-04-21","type":"loan","state":"CONFIRMED","comment":null},
    //         {"reservation_id":10,"tool_id":33,"user_id":32,"title":"Reservatie","startsAt":"2017-04-14","endsAt":"2017-04-21","type":"loan","state":"CONFIRMED","comment":null},
    //         {"reservation_id":11,"tool_id":39,"user_id":34,"title":"Reservatie","startsAt":"2017-04-24","endsAt":"2017-10-09","type":"loan","state":"CONFIRMED","comment":null},
    //         {"reservation_id":12,"tool_id":42,"user_id":36,"title":"Reservatie","startsAt":"2017-05-03","endsAt":"2017-10-12","type":"loan","state":"CONFIRMED","comment":null},
    //         {"reservation_id":13,"tool_id":45,"user_id":36,"title":"Reservatie","startsAt":"2017-05-03","endsAt":"2017-10-12","type":"reservations","state":"CONFIRMED","comment":null},
    //         {"reservation_id":14,"tool_id":61,"user_id":23,"title":"Reservatie","startsAt":"2017-04-28","endsAt":"2017-05-05","type":"loan","state":"CONFIRMED","comment":null},
    //         {"reservation_id":38,"tool_id":77,"user_id":13,"title":"Reservatie","startsAt":"2017-10-31","endsAt":"2017-11-06","type":"loan","state":"REQUESTED",
    //             "comment":"het is te hopen dat thomas daar niet mee weg is"}]
    // );
    // A simple test to verify the reservationService factory exists
    it('should exist', function() {
        expect(reservationService).toBeDefined();
    });
    it("should return all reservations", function () {
        var responseData = [{"reservation_id":1,"tool_id":1,"user_id":0,"title":"onderhoud","startsAt":"2017-02-15","endsAt":"2017-04-01","type":"maintenance","state":"REQUESTED","comment":null},
            {"reservation_id":38,"tool_id":77,"user_id":13,"title":"Reservatie","startsAt":"2017-10-31","endsAt":"2017-11-06","type":"loan","state":"REQUESTED",
                "comment":"het is te hopen dat thomas daar niet mee weg is"}];
        httpBackend.whenGET(__env.apiUrl + '/reservations').respond(responseData);
        reservationService.GetAll().then(function(response) {
            expect(response).toEqual({ success: true, message:responseData});
        });
        httpBackend.flush();
    });
    it("should return failure for http code 500", function () {
        httpBackend.whenGET(__env.apiUrl + '/reservations').respond(500, '');
        reservationService.GetAll().then(function(response) {
            expect(response).toEqual({ success: false, message:'Er ging iets mis, probeer later eens opnieuw'});
        });
        httpBackend.flush();
    });
    it("should return unauthenticated for http code 401", function () {
        var errorMessage = 'unknown user';
        httpBackend.whenGET(__env.apiUrl + '/reservations').respond(401,{message:errorMessage});
        reservationService.GetAll().then(function(response) {
            expect(response).toEqual({ success: false, message:'Geen toegang. Gelieve eerst (opnieuw) in te loggen (' + errorMessage + ')'});
        });
        httpBackend.flush();
    });
    it("should return open reservations", function () {
        var responseData = [{"reservation_id":1,"tool_id":1,"user_id":0,"title":"onderhoud","startsAt":"2017-02-15","endsAt":"2017-04-01","type":"maintenance","state":"REQUESTED","comment":null},
            {"reservation_id":38,"tool_id":77,"user_id":13,"title":"Reservatie","startsAt":"2017-10-31","endsAt":"2017-11-06","type":"loan","state":"REQUESTED",
                "comment":"het is te hopen dat thomas daar niet mee weg is"}];
        httpBackend.whenGET(__env.apiUrl + '/reservations?isOpen=true').respond(responseData);
        reservationService.GetOpen().then(function(response) {
            expect(response).toEqual({ success: true, message:responseData});
        });
        httpBackend.flush();
    });
    it("should return open reservations page", function () {
        var responseData = [{"reservation_id":1,"tool_id":1,"user_id":0,"title":"onderhoud","startsAt":"2017-02-15","endsAt":"2017-04-01","type":"maintenance","state":"REQUESTED","comment":null},
            {"reservation_id":38,"tool_id":77,"user_id":13,"title":"Reservatie","startsAt":"2017-10-31","endsAt":"2017-11-06","type":"loan","state":"REQUESTED",
                "comment":"het is te hopen dat thomas daar niet mee weg is"}];
        httpBackend.whenGET(__env.apiUrl + '/reservations?isOpen=true&_perPage=5').respond(responseData);
        reservationService.GetOpenByPage(1,5).then(function(response) {
            expect(response).toEqual({ success: true, message:responseData});
        });
        httpBackend.flush();
    });
    it("should cancel reservation", function () {
        var reservation = {"reservation_id":1,"tool_id":1,"user_id":0,"title":"onderhoud","startsAt":"2017-02-15","endsAt":"2017-04-01","type":"maintenance","state":"REQUESTED","comment":null};
        var expectedReservation = {"reservation_id":1,"tool_id":1,"user_id":0,"title":"onderhoud","startsAt":"2017-02-15","endsAt":"2017-04-01","type":"maintenance","state":"CANCELLED","comment":null};
        httpBackend.expectPUT(__env.apiUrl + '/reservations/1', function (data) {
            var reservationInRequest = JSON.parse(data);
            expectedReservation = reservationInRequest;
            if (reservationInRequest.state == 'CANCELLED') {
                return true;
            }
            return false;
        }).respond(200, expectedReservation);
        reservationService.Cancel(reservation).then(function(response) {
            expect(response).toEqual({ success: true, message:expectedReservation});
        });
        httpBackend.flush();
    });
    it("should update reservation", function () {
        var reservation = {"reservation_id":1,"tool_id":1,"user_id":0,"title":"onderhoud","startsAt":"2017-02-15","endsAt":"2017-04-01","type":"maintenance","state":"REQUESTED","comment":null};
        httpBackend.expectPUT(__env.apiUrl + '/reservations/1').respond(200, reservation);
        reservationService.Update(reservation).then(function(response) {
            expect(response).toEqual({ success: true, message:reservation});
        });
        httpBackend.flush();
    });
    it("should delete reservation", function () {
        var reservation = {"reservation_id":1,"tool_id":1,"user_id":0,"title":"onderhoud","startsAt":"2017-02-15","endsAt":"2017-04-01","type":"maintenance","state":"REQUESTED","comment":null};
        httpBackend.expectDELETE(__env.apiUrl + '/reservations/1').respond(200, '');
        reservationService.Delete(1).then(function(response) {
            expect(response).toEqual({ success: true, message:''});
        });
        httpBackend.flush();
    });

});