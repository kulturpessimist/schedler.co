module.exports = {
	production:{
		options: {
			user: "<%= cfg.cloudant.username %>",
		  	pass: "<%= cfg.cloudant.password %>",
		},
		files: {
			'<%= cfg.cloudant.url %>/<%= cfg.cloudant.couch %>': 'build/website.json'
		}
	}
};