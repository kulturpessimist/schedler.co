module.exports = {
	'default': [
		'preflight',
		'connect',
		'watch'
	],
  	'preflight': [
		'concat:css',
		'concat:js',
		'concat:html'
  	],
  	'compile': [
  		'preflight',
  		'couch-compile',
  		//'clean-couch-compile'
  	],
  	'deploy:staging': [
  		'compile',
  		'couch-push:staging'
  	],
  	'deploy:production': [
  		'compile',
  		'couch-push:production'
  	]
};