module.exports = {
	src: {
		files: [
			'src/_attachments/**/*', 
			'!src/_attachments/resources/**/*',
			'!src/_attachments/index.html'
		],
		tasks: ['preflight'],
		options: {
			livereload: true
		}
	},
	gruntfile: {
		files: ['Gruntfile.js']
	},
	livereload: {
		options: {
			livereload: true
		},
		files: [
			'src/_attachments/**/*', 
			'!src/_attachments/resources/**/*',
			'!src/_attachments/index.html'
		]
	}
};
