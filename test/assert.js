'use strict';

var Joi = require('joi');
var assert = require('chai').assert;

var JoiAssert = require('../index');

describe('assert', function () {

	describe('string', function () {

		describe('pass', function () {

			it('basic', function () {
				var schema = Joi.string();
				var input = 'abc';
				JoiAssert(input, schema);
			});

			it('return valid', function () {
				var schema = Joi.string();
				var input = 'abc';

				var actual = JoiAssert(input, schema);
				assert.strictEqual(actual, input);
			});
		});

		describe('error', function () {
			it('single basic', function () {
				var schema = Joi.string();

				assert.throws(function () {
					JoiAssert(123, schema);
				}, 'string: value must be a string');
			});

			it('single message', function () {
				var schema = Joi.string();

				assert.throws(function () {
					JoiAssert(123, schema, 'my test');
				}, 'my test: string: value must be a string');
			});
		});
	});

	describe('object', function () {

		describe('pass', function () {

			it('basic', function () {
				var schema = Joi.object({
					foo: Joi.string()
				});
				var input = {
					foo: 'abc'
				};
				JoiAssert(input, schema);
			});

			it('return value', function () {
				var schema = Joi.object({
					foo: Joi.string()
				});
				var input = {
					foo: 'abc'
				};
				var actual = JoiAssert(input, schema);
				assert.deepEqual(actual, input);
			});

			it('return stripped value', function () {
				var schema = Joi.object({
					foo: Joi.string()
				}).options({
					stripUnknown: true
				});
				var input = {
					foo: 'abc',
					bar: 123
				};
				var expected = {
					foo: 'abc'
				};
				var actual = JoiAssert(input, schema);
				assert.deepEqual(actual, expected);
			});
		});

		describe('error', function () {
			it('single', function () {
				var schema = Joi.object({
					foo: Joi.string()
				});
				assert.throws(function () {
					JoiAssert({
						foo: 123
					}, schema);
				}, 'object: foo must be a string');
			});

			it('single described', function () {
				var schema = Joi.object({
					foo: Joi.string()
				}).description('hoge');

				assert.throws(function () {
					JoiAssert({
						foo: 123
					}, schema);
				}, 'hoge: foo must be a string');
			});

			it('single deep described', function () {
				var schema = Joi.object({
					foo: Joi.object({
						buzz: Joi.string()
					})
				}).description('hoge');

				assert.throws(function () {
					JoiAssert({
						foo: {
							buzz: 123
						}
					}, schema);
				}, 'hoge: [foo.buzz] buzz must be a string');
			});

			it('multi basic', function () {
				var schema = Joi.object({
					foo: Joi.string(),
					bar: Joi.string()
				}).options({
					abortEarly: false
				});

				assert.throws(function () {
					JoiAssert({
						foo: 123,
						bar: 123
					}, schema);
				}, 'object(2) foo must be a string, bar must be a string');
			});

			it('multi described', function () {
				var schema = Joi.object({
					foo: Joi.string(),
					bar: Joi.string()
				}).options({
					abortEarly: false
				}).description('hoge');

				assert.throws(function () {
					JoiAssert({
						foo: 123,
						bar: 123
					}, schema);
				}, 'hoge(2) foo must be a string, bar must be a string');
			});

			it('multi message', function () {
				var schema = Joi.object({
					foo: Joi.string(),
					bar: Joi.string()
				}).options({
					abortEarly: false
				});

				assert.throws(function () {
					JoiAssert({
						foo: 123,
						bar: 123
					}, schema, 'my test');
				}, 'my test: object(2) foo must be a string, bar must be a string');
			});
		});
	});
});
