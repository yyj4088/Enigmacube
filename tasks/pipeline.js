var cssFilesToInject = [
    'styles/bootstrap.min.css',
    'styles/bootstrap-theme.min.css',

    'styles/**/*.css'
];
module.exports.cssFilesToInject = cssFilesToInject.map(function (path) {
    return '.tmp/public/' + path;
});


var jsFilesToInject = [
    'js/dependencies/sails.io.js',
    'js/dependencies/three.min.js',
    'js/dependencies/jquery.min.js',
    'js/dependencies/bootstrap.min.js',

    'js/dependencies/**/*.js',

    'js/**/*.js'
];
module.exports.jsFilesToInject = jsFilesToInject.map(function (path) {
    return '.tmp/public/' + path;
});
