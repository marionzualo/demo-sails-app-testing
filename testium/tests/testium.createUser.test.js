var should = require('chai').should(),
	barrels = require('barrels'),
	testium = require('testium'),
	browser = testium.getBrowser(),
	fixtures;

describe('Create User', function(){

	beforeEach(function(done){
		browser.navigateTo('/');
		browser.assert.httpStatus(200);
		done();
	});

	it('should have correct page title and no error message', function(){
		var pageTitle = browser.getPageTitle();
		pageTitle.should.equal('Testing Sails - Index');
		browser.assert.elementNotVisible('#errorMessage');
	});

	it('should display error message if the form is not completely filled', function(){
		var element = browser.getElement('#submitButton');
		element.click();
		browser.assert.elementIsVisible('#errorMessage');
	});

	it('should display success message upon correctly filling the form', function(done){
		
		var name = browser.getElement('#name');
		name.type('Mr. test');

		var email = browser.getElement('#email');
		email.type('t6@require.lx');

		var password = browser.getElement('#password');
		password.type('1234');

		var submit = browser.getElement('#submitButton');
		submit.click();
		
		browser.getPath().should.equal('/success');
		done();
	});
});

// All the tests are in mocha similarly to the remaining tests
// The paths are relative to the server
