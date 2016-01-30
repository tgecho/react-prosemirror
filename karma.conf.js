const webpackConfig = require('./webpack.config')

module.exports = function(config) {
    config.set({
        frameworks: ['jasmine'],

        plugins: [
            require('karma-jasmine'),
            require('karma-webpack'),
            require('karma-phantomjs-launcher'),
        ],

        files: [
            'test/*_tests.js',
            'test/**/*_tests.js'
        ],

        preprocessors: {
            'test/*_tests.js': ['webpack'],
            'test/**/*_tests.js': ['webpack']
        },

        webpack: webpackConfig,

        webpackMiddleware: {
            noInfo: true
        },
    });
};
