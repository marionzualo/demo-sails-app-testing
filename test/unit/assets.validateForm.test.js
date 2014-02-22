var should = require('chai').should(),
	sinon = require('sinon'),
	validateForm = require('../../assets/js/validateForm').validateForm;

describe('New User Form', function(){
	it('should not be submitted and return an error message if not complete', function (){

		//spies to simulate behavior of the form and error object
		var formSpy = sinon.spy();
		var form = {
			submit : formSpy
		};

		var errorSpy = sinon.spy();
		var error = {
			css : errorSpy
		};

		//user input
		var name = 'Test name';
		var email = 'new@mail.com';
		var password;
		validateForm(name,email, password, form, error);

		//return an error message
		errorSpy.calledOnce.should.be.true;
		errorSpy.calledWith('display','block').should.be.true;

		//form not submitted
		formSpy.calledOnce.should.be.false;
	});

	it('should be submitted if the form is correctly filled', function(){
		//spies to simulate behavior of the form and error object
		var formSpy = sinon.spy();
		var form = {
			submit : formSpy
		};

		var errorSpy = sinon.spy();
		var error = {
			css : errorSpy
		};

		var name = 'Test name';
		var email = 'new@mail.com';
		var password = '123456';
		validateForm(name,email, password, form, error);

		//does not return an error message
		errorSpy.calledOnce.should.be.false;
		
		//submits the form
		formSpy.calledOnce.should.be.true;
	});
});

// Mocking is achieved by using Sinon.js. Three types of objects: Spies, Stubs and Mocks
// Mocking is essential to isolate the code -> unit tests
// Spies are observation points as they record every call, arguments
// Run tests: mocha --ui bdd test/unit/assets.validateForm.test.js