module.exports = {
	options: {
		banner: '/*! \n<%= pkg.name %> - #<%= pkg.version %> \n' +
			'Author: Alex Schedler <alex@schedler.co> \n' +
			'<%= grunt.template.today("yyyy-mm-dd") %> \n*/\n\n'
	},
	default: {
		files: {
			'build/main.min.js': 'src/main.js'
		}
	}
};