'use strict';

var Joi = require('joi');
var assert = require('chai').assert;

var joiAssert = require('../index');

describe('bake', function () {

	describe('pass', function () {

		it('basic', function () {
			var schema = Joi.string();
			var assertion = joiAssert.bake(schema);
			var input = 'abc';

			assertion(input);
		});

		it('return valid', function () {
			var schema = Joi.string();
			var assertion = joiAssert.bake(schema);
			var input = 'abc';

			var actual = assertion(input);
			assert.strictEqual(actual, input);
		});
	});

	describe('error', function () {
		it('basic', function () {
			var schema = Joi.string();
			var assertion = joiAssert.bake(schema);
			var input = 123;

			assert.throws(function () {
				assertion(input);
			}, 'string: value must be a string');
		});

		it('message', function () {
			var schema = Joi.string();
			var assertion = joiAssert.bake(schema, 'my test');
			var input = 123;

			assert.throws(function () {
				assertion(input);
			}, 'my test: string: value must be a string');
		});
	});
});
