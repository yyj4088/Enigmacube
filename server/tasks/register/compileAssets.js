module.exports = function (grunt) {
	grunt.registerTask('compileAssets', [
		'copy:libs',
		'clean:dev',
		'jst:dev',
		'less:dev',
		'copy:dev',
		'coffee:dev'
	]);
};
