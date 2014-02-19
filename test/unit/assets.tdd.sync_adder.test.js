var Adder = require('../../assets/js/sync_adder').Adder;
var assert = require('chai').assert;

suite('Synchronous Adder - TDD', function(){
	setup(function(){
    // runs before all the tests
	});

	test('return 3 when adding 1 and 2', function() {
		var adder = new Adder();
		assert.equal(3, adder.add(1,2));
	});

	teardown(function(){
    // runs after all the tests
	});
});

// Mocha: simple, flexible (syntax, libraries), async/sync tests
// TDD interface: setup, teardown, test, and assert
// Chai: assertion library, multiple interfaces, works with multiple frameworks, 
// Run test: mocha --ui tdd test/unit/assets.tdd.sync_adder.test.js
