var should = require('chai').should(),
	Sails = require('sails'),
	assert = require('chai').assert,
	barrels = require('barrels'),
	sinon = require('sinon'),
	request = require('supertest'),
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
		//form parameters
		var allParams = {
			name: 'McIntosh',
			email: 'mail@test.com',
			password: 'test'
		};

		//access to the endpoint of the controller
		request(Sails.express.app).post('/user/create').send(allParams).end(function(err, res) {
			if (err) {
				throw err;
			}

			//asses if it was routed to the correct page
			var pageURL = res.header.location;
			pageURL.should.equal('/');

			//done needs to be called since it is an async test
			done();
		});
	});

	it('shoudl redirect to route success page if user does not exist', function(done){
		
		var allParams = {
			name: 'Test master',
			email: 'info@test2.com',
			password: 'test2'
		};

		request(Sails.express.app).post('/user/create').send(allParams).end(function(err, res) {
			if (err) {
				throw err;
			}
			
			//asses if it was routed to the correct page
			var pageURL = res.header.location;
			pageURL.should.equal('/success');

			//done needs to be called since it is an async test
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

		Sails.lower();
		done();
	});
});

// Integration tests:
// - Before the tests: lift the server (to call the controller), populate the tests DB (barrels - first test)
// - After the test: lower the server, clean the tests DB so we can rerun without problems (some records were inserted)
// - testDB != dev DB but a similar DB should be used
// Supertest is used to allow us to test HTTP request to the controller endpoint
// More complicated tests could be made: cookies, HTTP response codes, content-type, etc


//Turn on the DB: mongod --port 3089
//Run the tests: mocha --ui bdd test/integration/controllers.UserController.test.js
