# joi-assert

[![Build Status](https://secure.travis-ci.org/Bartvds/joi-assert.png?branch=master)](http://travis-ci.org/Bartvds/joi-assert) [![NPM version](https://badge.fury.io/js/joi-assert.png)](http://badge.fury.io/js/joi-assert) [![Dependency Status](https://david-dm.org/Bartvds/joi-assert.png)](https://david-dm.org/Bartvds/joi-assert) [![devDependency Status](https://david-dm.org/Bartvds/joi-assert/dev-status.png)](https://david-dm.org/Bartvds/joi-assert#info=devDependencies)

> Assert values using Joi schemas

Use [Spumko's Joi](https://github.com/spumko/joi) schemas in assertion statements that validate values and either return the validated value or throw an [AssertionError](https://github.com/chaijs/assertion-error) (with readable message). 

:warning: Under construction... bonus features might not be tested yet :sunglasses:

## Usage

Get it from npm:

````bash
$ npm install joi
$ npm install joi-assert
````

### Basic example

````js
var Joi = require('joi');
var JoiAssert = require('joi-assert');

var schema = Joice.string().min(5);
JoiAssert.assert(myValue, schema);
````

### Validate input

````js
var schema = Joi.object({
	foo: Joi.string().required()
	bar: Joi.string().default('hoge').optional()
}).object({
	allowUnknown: true,
	stripUnknown: true
});

// some dirty input
var raw = {
	foo: 'abc',
	zip: 123
}
// pass
var data = JoiAssert(raw, schema);

// data is now
{
	foo: 'abc',
	bar: 'hoge'
}

````


## Build

Install development dependencies in your git checkout:

````bash
$ npm install
````

Build and run tests using [grunt](http://gruntjs.com):

````bash
$ npm test
````

See the `Gruntfile.js` for additional commands.

## License

Copyright (c) 2014 Bart van der Schoor

Licensed under the MIT license.
