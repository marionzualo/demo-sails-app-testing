var should = require('chai').should(),
	Sails = require('sails'),
	assert = require('chai').assert,
	barrels = require('barrels'),
	sinon = require('sinon'),
	fixtures;

describe('UserController ', function(){
	this.timeout(0);
	// Global before hook
	before(function (done) {
	  // Lift Sails with test database
	  Sails.lift({
	    log: {
	      level: 'error'
	    },
	    adapters: {
	    	default: 'test',
	      	test: {
		        module: 'sails-mongo',
		        host: 'localhost',
		        port: 3089,
		        user: '',
		        password: '',
		        database: 'testDB',
		        schema: true
		    }
	    }
	  }, function(err, sails) {
	    if (err)
	      return done(err);
	    // Load fixtures
	    barrels.populate(function(err) {
	      done(err, sails);
	    }, process.cwd() + '/test/integration/fixtures/');
	    // Save original objects in `fixtures` variable
	    fixtures = barrels.objects;
	  });
	});

	it('should redirect to route homepage if user exists', function(done){

		var allParams = {
			name: 'McIntosh',
			email: 'mail@test.com',
			password: 'test'
		};

		var req = {
			params : {
				//Stub will simulate the behavior of request by returning all input parameters
				all : sinon.stub()
			}
		};

		req.params.all.returns(allParams);

		var res = {
			//Spy that will allow us to assess if redirect was called and its argument
			redirect: sinon.spy()
		};

		var next = {};

		Sails.controllers.user.create(req, res, function(){
			//checking if the correct URL was chosen
			res.redirect.calledOnce.should.be.true;
			res.redirect.calledWith('/').should.be.true;
			//done is called to tell mocha to end the tests since it is async code
			done();
		});
	});

	it('shoudl redirect to route success page if user does not exist', function(done){
		var allParams = {
			name: 'Test master',
			email: 'info@test2.com',
			password: 'test2'
		};

		var req = {
			params : {
				//stub that allows us to get all the parameters from the request
				all : sinon.stub()
			},
			session: {
				User : sinon.spy()
			}
		};

		req.params.all.returns(allParams);

		var res = {
			//Spy that will allow us to assess if redirect was called and its argument
			redirect: sinon.spy()
		};

		var next = {};

		Sails.controllers.user.create(req, res, function(){
			//checking if the correct URL was chosen
			res.redirect.calledOnce.should.be.true;
			res.redirect.calledWith('/success').should.be.true;
			//done is called to tell mocha to end the tests since it is async code
			done();
		});
	});

	// Global after hook
	after(function (done) {
		var cb = function(){},
		options = {};
		//Delete the changes made to the testDB
		Object.keys(Sails.models).forEach(function(modelName) {
			Sails.adapters['sails-mongo'].destroy(modelName, options, cb);
		});

		sails.lower();
		done();
	});
});

// Integration tests:
// - Before the tests: lift the server (to call the controller), populate the tests DB (barrels - first test)
// - After the test: lower the server, clean the tests DB so we can rerun without problems (some records were inserted)
// - testDB != dev DB but a similar DB should be used
// Stub for request, spy for response, done and async code


//Turn on the DB: mongod --port 3089
//Run the tests: mocha --ui bdd test/integration/controllers.UserController.test.js
