"use strict";

ddescribe("reservation api service", function () {
    var reservationService, httpBackend, __env, localStorageBackend;

    beforeEach(module("reddit"));

    beforeEach(inject(function (_reservationService_, $httpBackend, $localStorage) {
        reservationService = _reservationService_;
        httpBackend = $httpBackend;
        __env = __env;
        localStorageBackend = $localStorage;
    }));

    it("should request list of reservations", function () {
        httpBackend.whenGET("http://api.reddit.com/user/yoitsnate/submitted.json").respond({
            data: {
                children: [
                    {
                        data: {
                            subreddit: "golang"
                        }
                    },
                    {
                        data: {
                            subreddit: "javascript"
                        }
                    },
                    {
                        data: {
                            subreddit: "golang"
                        }
                    },
                    {
                        data: {
                            subreddit: "javascript"
                        }
                    }
                ]
            }
        });
        reservationService.GetAll().then(function(response) {
            expect(response).toEqual(["golang", "javascript"]);
        });
        httpBackend.flush();
    });

});