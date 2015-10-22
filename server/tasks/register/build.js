module.exports = function (grunt) {
	grunt.registerTask('build', [
		'copy:libs',
		'compileAssets',
		'linkAssetsBuild',
		'clean:build',
		'copy:build'
	]);
};
