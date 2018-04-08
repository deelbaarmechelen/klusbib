describe('toolDetail', function () {
    // Load the module that contains the `toolList` component before each test
    beforeEach(angular.mock.module('mwl.calendar'));
    beforeEach(module('toolDetail'));

    beforeEach(function() {

        module(function ($provide) {
            $provide.service('User', function () {
                var user = {id:null};
                this.get = function () {return user;};
            });
            $provide.service('ReservationService', function () {
            });
            // $provide.constant('__env', function () {
            //     var envMock = {};
            //
            //     envMock.apiUrl = 'localhost';
            //     return envMock;
            // });
            $provide.constant('__env',  {apiUrl : 'http://localhost', baseUrl:'/', enableDebug:'true'});
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
    describe('ToolDetailController', function () {
        var $httpBackend, ctrl, __env;

        // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
        // This allows us to inject a service and assign it to a variable with the same name
        // as the service while avoiding a name conflict.
        beforeEach(inject(function ($componentController, _$httpBackend_, ___env_) {
            $httpBackend = _$httpBackend_;
            // $httpBackend.expectGET('data/tools/wood-1.json')
            //     .respond({
            //         "id": "wood-1", "name": "wipzaag", "description": "Simpele wipzaag",
            //         "link": null, "category": "wood", "img": "dummy.jpg"
            //     });
            tool = 'wood-1';
            ctrl = $componentController('toolDetail');
            __env = ___env_;
        }));

        it('should define __env', function () {
            expect(__env).toBeDefined();
            expect(__env.apiUrl).toEqual('http://localhost');
        })

        it('should define now method', function () {
            expect(ctrl.now).toBeDefined();
        })

        xit('should create a `tool` property fetched with `$http`', function () {
            expect(ctrl.tool).toBeUndefined();

            $httpBackend.flush();
            expect(ctrl.tool.id).toEqual('wood-1');
            expect(ctrl.tool.name).toEqual('wipzaag');
            expect(ctrl.tool.description).toEqual('Simpele wipzaag');
            expect(ctrl.tool.category).toEqual('wood');
        });

        // Test calendar
        describe('ToolDetailCalendar', function () {
            var $httpBackend, ctrl, __env;
            beforeEach(inject(function ($componentController, _$httpBackend_, ___env_) {
                $httpBackend = _$httpBackend_;
                ctrl = $componentController('toolDetail');
                __env = ___env_;
            }));

            it('should show calendar by month', function () {
                expect(ctrl.calendarView).toEqual('month');
            });
            it('should create an event', function () {
                expect(ctrl.events).toBeUndefined();
                $httpBackend.expectGET(__env.apiUrl + '/tools/1')
                    .respond(
                        {
                            "tool_id":1,"name":"Boorhamer","description":"Voor grote werken. Om te kappen (in beton, steen, vloeren, muren) en gaten te boren met een lange en grote diameter. 2 functies: kloppen en klopboren. Opgelet: kan een terugslag geven als de boor vast komt te zitten en in klopboorstand staat.",
                            "code":"KB-000-17-001","owner_id":0,"reception_date":"2017-04-01","category":"construction","brand":"Bosch","type":"GBH 11 DE","serial":null,"manufacturing_year":null,
                            "manufacturer_url":"https:\/\/www.bosch-professional.com\/be\/nl\/archive\/gbh-11-de-5765-p\/",
                            "doc_url":"https:\/\/www.bosch-professional.com\/be\/nl\/archive\/download\/manual\/gbh-11-de-manual-117987.pdf",
                            "img":"https:\/\/localhost\/uploads\/dummy.jpg","replacement_value":500,"experience_level":null,"safety_risk":null,"state":"READY","visible":true,
                            // {"reservation_id":1,"tool_id":1,"user_id":1,"title":"Reservatie","startsAt":"2017-10-13","endsAt":"2018-04-06","type":"loan","state":"CLOSED","comment":"Bosch SDS MAX + beitel"},
                            "reservations" : []
                    });
                ctrl.reloadTool(1);
                $httpBackend.flush();


                var emptyEvents = [];
                expect(ctrl.events).toEqual(emptyEvents);

                ctrl.addEvent();
                expect(ctrl.events[0]).toEqual(jasmine.objectContaining({title: 'Reserved'}));
                // check new event is full week

            });
        });
    });


});