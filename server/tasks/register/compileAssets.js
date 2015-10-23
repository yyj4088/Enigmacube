module.exports = function (grunt) {
	grunt.registerTask('compileAssets', [
		'copy:libs',
		'clean:dev',
		'sass:dev',
		'copy:dev'
	]);
};
