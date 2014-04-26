# joi-assert

[![Build Status](https://secure.travis-ci.org/Bartvds/joi-assert.png?branch=master)](http://travis-ci.org/Bartvds/joi-assert) [![NPM version](https://badge.fury.io/js/joi-assert.png)](http://badge.fury.io/js/joi-assert) [![Dependency Status](https://david-dm.org/Bartvds/joi-assert.png)](https://david-dm.org/Bartvds/joi-assert) [![devDependency Status](https://david-dm.org/Bartvds/joi-assert/dev-status.png)](https://david-dm.org/Bartvds/joi-assert#info=devDependencies)

> Assert values using Joi schemas

Use [Spumko's Joi](https://github.com/spumko/joi) schemas in assertion statements that validate values and either return the validated value or throw an [AssertionError](https://github.com/chaijs/assertion-error) (with readable message). 

This makes Joi schemas usable as input-assertions in user facing APIs, and as assertion library for use with frameworks like [mocha](https://visionmedia.github.io/mocha/). 

:warning: Early phase so users beware.

## Usage

Get it from npm:

````bash
$ npm install joi
$ npm install joi-assert
````

### Basic assertion

````js
// import plain Joi
var Joi = require('joi');

// import the module
var joiAssert = require('joi-assert');

// get a Joi schema
var schema = Joi.string().min(5);

// validate data and throw AssertionError on failure
joiAssert(raw, schema);
````

### Validate input

````js
// assertion returns valid data as one-liner
var valid = joiAssert(raw, schema);
```

### Validate *and* sanitize input

````js
var schema = Joi.object({
	foo: Joi.string().required(),
	bar: Joi.string().optional().default('hoge')
}).object({
	allowUnknown: true,
	stripUnknown: true
});

// get valid but dirty input data
var raw = {
	foo: 'abc',
	nope: null
}
// pass through assertion
var data = joiAssert(raw, schema);

// data is now clean
{
	foo: 'abc',
	bar: 'hoge'
}
````

### Bake assertion function

````js
var schema = Joi.string().min(5).max(10);
var fiveTen = joiAssert.bake(schema, 'five to ten');

// nice
fiveTen(10);
fiveTen(5);

// kablam!
fiveTen(20);

// get fancy
var clean = [5, 6, 7, 8].map(fiveTen);
````

## Build

Install development dependencies:

````bash
$ npm install
$ npm install -g grunt-cli
````

Build and run tests using [grunt](http://gruntjs.com):

````bash
$ grunt test
````

See the `Gruntfile.js` for additional commands.

## Contributions

Pull requests with fixes are very welcome, for new features best ask via a [issue](https://github.com/Bartvds/joi-assert/issues) first.

## License

Copyright (c) 2014 Bart van der Schoor

Licensed under the MIT license.
