'use strict';

// Angular E2E Testing Guide:
// https://docs.angularjs.org/guide/e2e-testing

describe('Tool Library Application', function() {

  describe('toolList', function() {

    beforeEach(function() {
      browser.get('index.html');
    });

    it('should filter the tool list as a user types into the search box', function() {
      var toolList = element.all(by.repeater('item in $ctrl.tools'));
//      var query = element(by.model('$ctrl.query'));

      expect(toolList.count()).toBe(3);

//      query.sendKeys('zaag');
//      expect(toolList.count()).toBe(1);
//
//      query.clear();
//      query.sendKeys('boor');
//      expect(toolList.count()).toBe(2);
    });

  });

});