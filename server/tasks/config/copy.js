/**
 * Copy files and folders.
 *
 * ---------------------------------------------------------------
 *
 * # dev task config
 * Copies all directories and files, exept coffescript and less fiels, from the sails
 * assets folder into the .tmp/public directory.
 *
 * # build task config
 * Copies all directories nd files from the .tmp/public directory into a www directory.
 *
 * For usage docs see:
 *        https://github.com/gruntjs/grunt-contrib-copy
 */
module.exports = function (grunt) {

    grunt.config.set('copy', {
        libs: {
            files: [
                {
                    expand: true,
                    cwd: 'node_modules/three',
                    src: ['three.min.js'],
                    dest: 'assets/js/dependencies'
                },
                {
                    expand: true,
                    cwd: 'node_modules/bootstrap/dist/css',
                    src: ['bootstrap.min.css', 'bootstrap-theme.min.css'],
                    dest: 'assets/styles'
                },
                {
                    expand: true,
                    cwd: 'node_modules/bootstrap/dist/js',
                    src: ['bootstrap.min.js'],
                    dest: 'assets/js/dependencies'
                },
                {
                    expand: true,
                    cwd: 'node_modules/bootstrap/dist/fonts',
                    src: ['**/*'],
                    dest: 'assets/fonts'
                },
                {
                    expand: true,
                    cwd: 'node_modules/jquery/dist',
                    src: ['jquery.min.map', 'jquery.min.js'],
                    dest: 'assets/js/dependencies'
                }
            ]
        },
        dev: {
            files: [
                {
                    expand: true,
                    cwd: 'assets',
                    src: ['**/*.!(scss|sass)'],
                    dest: '.tmp/public'
                }
            ]
        },
        build: {
            files: [{
                expand: true,
                cwd: '.tmp/public',
                src: ['**/*'],
                dest: 'www'
            }]
        }
    });

    grunt.loadNpmTasks('grunt-contrib-copy');
};
