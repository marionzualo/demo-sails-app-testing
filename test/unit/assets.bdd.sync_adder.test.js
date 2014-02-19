var Adder = require('../../assets/js/sync_adder').Adder;
var should = require('chai').should();

describe('Synchronous Adder', function(){
	before(function(){
		//runs before all tests
	});

	it('should return 3 when adding 1 and 2', function() {
		var adder = new Adder();
		adder.add(1,2).should.equal(3);
	});

	after(function(){
		//runs after all tests
	});
});

//BDD interface: it, before, after, should
//reads like a sentence
//Chai supports both should and assert
//Main difference with TDD is the language
//Run tests: mocha --ui bdd test/unit/assets.bdd.sync_adder.test.js