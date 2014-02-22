var should = require('chai').should(),
	Sails = require('sails'),
	assert = require('chai').assert,
	barrels = require('barrels'),
	fixtures;

describe('User model', function(){



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

	describe('create user', function(){
		it('should return error if e-mail is missing', function(done){
			var params = {
				name: 'Popeye'
			};

			User.create(params, function(error, user){
				should.exist(error);
				done();
			});
		});

		it('should not store passwords in plaintext', function(done){
			var originalPassword = 'awesome';
			var params = {
				name: 'Popeye Man',
				email: 'mail@popeye.com',
				password: originalPassword
			};
			
			User.create(params, function(error,user){
				should.not.exist(error);

				user.password.should.not.equal(originalPassword, 'stored password should be hashed.');

				// Compare password from the form params to the encrypted password of the user found.
				require('bcrypt').compare(originalPassword, user.password, function(err, valid) {
					should.not.exist(err);
					valid.should.be.true;
					done();
				});
			});
		});

		it('should have loaded the user McIntosh from fixtures', function(done){
			User.findOne({email:'mail@test.com'}, function(err, user){
				should.not.exist(err);
				user.name.should.equal('McIntosh');
				done();
			});
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


//Turn on the DB: mongod --port 3089
//Run the tests: mocha --ui bdd test/integration/models.User.test.js

