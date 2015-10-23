module.exports = function (grunt) {
	grunt.registerTask('build', [
		'copy:libs',
		'compileAssets',
		'clean:build',
		'copy:build'
	]);
};
