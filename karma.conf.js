var webpackConfig = require('./webpack.dev.js');
const puppeteer = require('puppeteer');
process.env.CHROME_BIN = puppeteer.executablePath();

//jshint strict: false
module.exports = function (config) {
    config.set({

        // basePath: './app',

        autoWatch: true,

        frameworks: ['jasmine'],

        files: [
            // 'dist/app.bundle.js',
            // Grab all files in the app folder that contain .spec.
            'test/tests.webpack.js'
        ],
        preprocessors: {
            './app/app.module.js': ['webpack'],
            // Reference: http://webpack.github.io/docs/testing.html
            // Reference: https://github.com/webpack/karma-webpack
            // Convert files with webpack and load sourcemaps
            './test/tests.webpack.js': ['webpack', 'sourcemap']
        },
        // browsers: ['Chrome', 'Firefox'],
        browsers: ['ChromeHeadless'],
        // browsers: ['Chrome'],

        reporters: ['spec'],

        junitReporter: {
            outputFile: 'test_out/unit.xml',
            suite: 'unit'
        },

        webpack: webpackConfig,
        // webpack: {
        //     devtool: 'inline-source-map'
        //
        // },

    });
};