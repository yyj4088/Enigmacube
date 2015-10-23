module.exports = function (grunt) {
	grunt.registerTask('buildProd', [
		'copy:libs',
		'compileAssets',
		'concat',
		'uglify',
		'cssmin',
		'clean:build',
		'copy:build'
	]);
};
