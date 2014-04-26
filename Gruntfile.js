module.exports = function (grunt) {
	'use strict';

	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-mocha-test');

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		clean: {
			dist: [
				'dist/**/*'
			],
			tmp: [
				'tmp/**/*'
			],
			test: [
				'test/tmp/**/*'
			]
		},
		jshint: {
			options: grunt.util._.extend(grunt.file.readJSON('.jshintrc'), {
				reporter: './node_modules/jshint-path-reporter'
			}),
			support: {
				options: {
					node: true
				},
				src: ['Gruntfile.js']
			},
			src: ['src/parsimmon.js'],
			test: {
				src: ['test/**/*.js']
			}
		},
		mochaTest: {
			options: {
				reporter: 'mocha-unfunk-reporter',
				ui: 'bdd'
			},
			specs: ['test/*.js']
		}
	});

	grunt.registerTask('prep', [
		'clean:tmp',
		'clean:dist',
		'clean:test',
		'jshint:support'
	]);
	grunt.registerTask('build', [
		'prep',
		'jshint:src'
	]);
	grunt.registerTask('test', [
		'build',
		'jshint:test',
		'mochaTest:specs',
	]);
	grunt.registerTask('dev', ['ts:typings']);

	grunt.registerTask('default', ['build']);
};
