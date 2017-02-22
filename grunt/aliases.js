module.exports = {
	'default': [
		'preflight',
		'connect',
		'watch'
	],
  	'preflight': [
		'concat:css',
		'concat:js',
		'concat:html',
		'cssmin',
		'uglify'
  	],
  	'compile': [
  		'preflight',
		'imagemin',
  		'couch-compile',
  		'clean-couch-compile'
  	],
  	'deploy': [
  		'compile',
  		'couch-push:production'
  	]
};