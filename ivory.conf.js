// Karma configuration
// Generated on Fri Sep 19 2014 14:41:49 GMT+0530 (India Standard Time)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
      'https://ajax.googleapis.com/ajax/libs/angularjs/1.3.2/angular.min.js',
      'https://code.angularjs.org1.3.2/angular-route.js',
      'https://code.angularjs.org/1.3.2/angular-resource.js',
      'https://ajax.googleapis.com/ajax/libs/jquery/2.1.0/jquery.min.js',
      'src/main/webapp/resources/js/lib/angular-mocks.js',
      'src/main/webapp/resources/js/controllers/*.js',
      //'src/main/webapp/resources/js/ivory.js',
      'src/main/webapp/resources/js/services.js',
      'src/test/js/**/*.js',
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress', 'spec', 'html'],
    
    
    htmlReporter: {
    	outputFile: 'tests/unit_tests.html',
    },


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false
  });
};
