module.exports = {
	src: {
		files: [
			'src/**/*', 
			'!src/dist/**/*',
			'!src/index.html'
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
			'src/**/*', 
			'!src/dist/**/*',
			'!src/index.html'
		]
	}
};
