module.exports = {
	'default': [
		'preflight',
		'copy:images',
		'connect',
		'watch'
	],
	'preflight': [
		'clean:surge',
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