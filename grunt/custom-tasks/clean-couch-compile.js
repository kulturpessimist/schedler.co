'use strict';
module.exports = function (grunt) {
	grunt.registerTask('clean-couch-compile', function () {

		var build = "build/website.json";
		var killList = [
		 	"css/",
		 	"js/",
		 	"partials/",
			"images/",
			"fonts/Abula/ExtLt/",
			"dist/main.js",
			"dist/main.css"
		];
		
		if (!grunt.file.exists(build)) {
			grunt.log.error("file " + build + " not found");
			return true;
		}
		var couchapp = grunt.file.readJSON(build);
		var files = couchapp.docs[0]._attachments;
		
		for(var f in files){
			killList.forEach(function(elt, i) {
				if( f.indexOf(elt) == 0 ){
					grunt.log.writeln("removing", f);
					delete files[f];
				}
			});
		}
		grunt.file.write(build, JSON.stringify(couchapp, null, 4));//serialize it back to file
		grunt.log.ok(build, 'cleaned and ready for deploy');

	});
};