exports.rewrites = [
	{
		"from": "",
		"to": "frontend/index.html"
	},
	{
		"from":		"assets/*",
		"to":		"frontend/*"
	},

	{
		"from":		"css/*",
		"to":		"frontend/css/*"
	},
	{
		"from":		"img/*",
		"to":		"frontend/img/*"
	},
	{
		"from":		"js/*",
		"to":		"frontend/js/*"
	},

	{
		"from":		"favicon.ico",
		"to":		"frontend/img/favicon.ico"
	},
	{
		"from":		"font/*",
		"to":		"frontend/font/*"
	},
	/* keeping relative urls sane */
	{
		"from":		"/*",
		"to":		"/*"
	}
];
