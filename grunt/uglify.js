module.exports = {
	options:{
		banner: '/*! \n<%= pkg.name %> - #<%= pkg.version %> \n' +
				'Author: Alex Schedler <alex@purr.is> \n' +
				'<%= grunt.template.today("yyyy-mm-dd") %> \n*/\n\n'
	},
	default: {
		files:{
			'src/_attachments/dist/main.min.js': 'src/_attachments/dist/main.js'
		}
	}
};