//jshint strict: false
module.exports = function (config) {
    config.set({

        basePath: './app',

        files: [
            'bower_components/angular/angular.js',
            'bower_components/angular-animate/angular-animate.js',
            'bower_components/angular-route/angular-route.js',
            'bower_components/angular-ui-router/release/angular-ui-router.js',
            'bower_components/angular-resource/angular-resource.js',
            'bower_components/angular-base64/angular-base64.js',
            'bower_components/ngstorage/ngStorage.js',
            'bower_components/angular-css/angular-css.js',
            'bower_components/moment/moment.js',
            'bower_components/angular-bootstrap-calendar/dist/js/angular-bootstrap-calendar-tpls.min.js',
            'bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
            'bower_components/angular-resource/angular-resource.js',
            'bower_components/angular-mocks/angular-mocks.js',
            'bower_components/angular-bootstrap-colorpicker/js/bootstrap-colorpicker-module.min.js',

            'bower_components/angular-jquery/dist/angular-jquery.min.js',
            'bower_components/angular-bootstrap-affix/dist/angular-bootstrap-affix.min.js',
            'bower_components/angular-flash-alert/dist/angular-flash.min.js',
            'bower_components/lodash/dist/lodash.min.js',
            'bower_components/angular-simple-logger/dist/angular-simple-logger.min.js',
            'bower_components/angular-google-maps/dist/angular-google-maps.js',
            'app.env.js',
            'app.module.js',
            'app.controller.js',
            'app.config.js',
            'core/core.module.js',
            'core/core.js',
            '**/*.service.js',
            '**/*.module.js',
            // '*!(.module|.spec).js',
            '!(bower_components)/**/*!(.module|.spec).js',
            '../test/**/*.spec.js'
        ],

        exclude: [
            '**/gulpfile.js',
            '**/home/js/*.js',
            '**/home/node_modules/**/*.js'
        ],

        autoWatch: true,

        frameworks: ['jasmine'],

        // browsers: ['Chrome', 'Firefox'],
        browsers: ['PhantomJS'],
        // browsers: ['Chrome'],

        plugins: [
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-phantomjs-launcher',
            'karma-jasmine',
            'karma-junit-reporter',
            'karma-spec-reporter'
        ],
        reporters: ['spec'],
        junitReporter: {
            outputFile: 'test_out/unit.xml',
            suite: 'unit'
        }
    });
};