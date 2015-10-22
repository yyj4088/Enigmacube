module.exports = function (grunt) {
	grunt.registerTask('buildProd', [
		'copy:libs',
		'compileAssets',
		'concat',
		'uglify',
		'cssmin',
		'linkAssetsBuildProd',
		'clean:build',
		'copy:build'
	]);
};
