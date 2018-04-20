var webpackConfig = require('./webpack.config.js');
// webpackConfig.entry = {};

//jshint strict: false
module.exports = function (config) {
    config.set({

        // basePath: './app',

        // files: [
        //     'node_modules/moment/moment.js',
        //     'node_modules/@bower_components/lodash/dist/lodash.min.js',
        //     'node_modules/angular/angular.js',
        //     'node_modules/angular-animate/angular-animate.js',
        //     'node_modules/angular-base64/angular-base64.js',
        //     'node_modules/angular-bootstrap/ui-bootstrap-tpls.js',
        //     'node_modules/angular-bootstrap-affix/dist/angular-bootstrap-affix.min.js',
        //     'node_modules/angular-bootstrap-calendar/dist/js/angular-bootstrap-calendar-tpls.min.js',
        //     'node_modules/angular-bootstrap-colorpicker/js/bootstrap-colorpicker-module.min.js',
        //     'node_modules/angular-route/angular-route.js',
        //     'node_modules/angular-ui-bootstrap/dist/ui-bootstrap.js',
        //     'node_modules/angular-ui-router/release/angular-ui-router.js',
        //     'node_modules/angular-resource/angular-resource.js',
        //     'node_modules/angular-simple-logger/dist/angular-simple-logger.min.js',
        //     'node_modules/angular-flash-alert/dist/angular-flash.min.js',
        //     'node_modules/angular-google-maps/dist/angular-google-maps.js',
        //     'node_modules/angular-css/angular-css.js',
        //
        //     'node_modules/ngstorage/ngStorage.js',
        //     'node_modules/angular-mocks/angular-mocks.js',
        //     'app.env.js',
        //     'app.module.js',
        //     'app.controller.js',
        //     'app.config.js',
        //     'core/core.module.js',
        //     'core/core.js',
        //     '**/*.service.js',
        //     '**/*.module.js',
        //     '**/*.component.js',
        //     // '*!(.module|.spec).js',
        //     //'!(bower_components)/**/*!(.module|.spec).js',
        //     '../test/**/*.spec.js'
        // ],
        //
        // exclude: [
        //     '**/gulpfile.js',
        //     '**/home/js/*.js',
        //     '**/home/node_modules/**/*.js'
        // ],

        autoWatch: true,

        frameworks: ['jasmine'],

        files: [
            // 'dist/app.bundle.js',
            // 'node_modules/angular/angular.js',
            // 'node_modules/angular-mocks/angular-mocks.js',
            // Grab all files in the app folder that contain .spec.
            'test/tests.webpack.js'
            // 'test/services/reservation.service.spec.js'
        ],
        preprocessors: {
            './app/app.module.js': ['webpack'],
            // Reference: http://webpack.github.io/docs/testing.html
            // Reference: https://github.com/webpack/karma-webpack
            // Convert files with webpack and load sourcemaps
            './test/tests.webpack.js': ['webpack', 'sourcemap']
        },
        // browsers: ['Chrome', 'Firefox'],
        browsers: ['PhantomJS'],
        // browsers: ['Chrome'],

// when omitted, karam loads all plugins found in node_modules
        // plugins: [
        //     'karma-chrome-launcher',
        //     'karma-firefox-launcher',
        //     'karma-phantomjs-launcher',
        //     'karma-jasmine',
        //     'karma-junit-reporter',
        //     'karma-spec-reporter',
        //     'karma-webpack',
        //     'karma-sourcemap-loader'
        // ],

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