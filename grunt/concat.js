module.exports = {
	css:{
		options: {
			separator: '',
		},
		src: [
			'src/_attachments/css/webslides.css',
			'src/_attachments/css/colors.css',
			'src/_attachments/css/svg-icons.css',
			'src/_attachments/css/schedler.co.css'
		],
		dest: 'src/_attachments/dist/main.css',
	},
	js:{
		options: {
			separator: ';',
		},
		src: [
			'src/_attachments/js/svg-icons.js',
			'src/_attachments/js/webslides.js',
			'src/_attachments/js/main.js'
		],
		dest: 'src/_attachments/dist/main.js',
	},
	html:{
		options: {
			separator: '\n',
		},
		src: [
			'src/_attachments/partials/_header.html',
			//'src/_attachments/partials/0-loading.html',
			'src/_attachments/partials/1-home.html',
			'src/_attachments/partials/2-contact.html',
			'src/_attachments/partials/3-overview.html',

			'src/_attachments/partials/jobs/6-MAN.html',
			'src/_attachments/partials/jobs/5-IOB.html',
			'src/_attachments/partials/jobs/4-Thinxnet.html',
			'src/_attachments/partials/jobs/3-natureOffice.html',
			'src/_attachments/partials/jobs/2-Dynomedia.html',
			'src/_attachments/partials/jobs/1-KIGG.html',

			'src/_attachments/partials/4-Education.html',
			'src/_attachments/partials/5-Personal.html',
			'src/_attachments/partials/6-Technology.html',
			
			'src/_attachments/partials/_footer.html'
		],
		dest: 'src/_attachments/index.html',
	}
};