var testium = require('testium'),
	Sails = require('sails'),
	barrels = require('barrels'),
	fixtures;

Sails.lift({
	port: 5050,
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
  		console.log('sails lifted');

	    if (err)
	      return err;
	    // Load fixtures
	    barrels.populate(function(err) {
	      
	    }, __dirname + '/tests/fixtures/');
	    // Save original objects in `fixtures` variable
	    fixtures = barrels.objects;

	    var testOptions = {
	    	tests: __dirname + '/tests/testium.createUser.test.js',
	    	applicationPort: 5050,
	    	browser: 'phantomjs'
		};

		testium.run(testOptions, function (error, exitCode){
			var cb = function(){}, options = {};
			//Delete the changes made to the testDB
			Object.keys(Sails.models).forEach(function(modelName) {
				Sails.adapters['sails-mongo'].destroy(modelName, options, cb);
			});
			console.log('lowering sails...');
			sails.lower();
			process.exit(code=0);
		});
});

// testOptions is where we set the configurations for testium
// tests is the folder or file to run the tests. Currently just passing to a file
// application port -> port of the tested application. -> same as the one lifted before
// browser -> chrome /phantom / FF/ IE
// after the tests lower the server
// Run the tests: node testium/testrunner.testium.js



