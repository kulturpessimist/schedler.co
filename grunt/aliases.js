module.exports = {
	'default': [
		'preflight',
		'connect',
		'watch'
	],
	'preflight': [
		'clean:surge',
		'copy:images',
		'concat:css',
		'concat:js',
		'concat:html',
		'cssmin',
		'uglify',
		'clean:post',
		'copy:default'
	],
	'compile': [
		'preflight',
		'imagemin'
	],
	'deploy': [
		'compile',
		'surge'
	]
};