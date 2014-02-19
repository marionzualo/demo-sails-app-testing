var testium = require('testium'),
	assert = require('chai').assert,
	browser = testium.getBrowser();

describe('Main page', function(){
	before(function(){
		browser.navigateTo('/');
		browser.assert.httpStatus(200);
	});

	it('should have correct page title', function(done){
		var pageTitle = browser.getPageTitle();
		assert.equal('Testing Sails', pageTitle);
		done();
	});
    
});
   

  
