module.exports = function (grunt) {
	require('time-grunt')(grunt);

	require('load-grunt-config')(grunt, {
		init: true,
		data: {
			pkg: grunt.file.readJSON('package.json')
		},
		jitGrunt: {
			staticMappings: {
				'couch-compile': 'grunt-couch',
				'couch-push': 'grunt-couch',
				'clean-couch-compile': 'grunt/custom-tasks/clean-couch-compile.js'
			}
		}
	});

};