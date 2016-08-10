karma-commonjs-require
===

Used for testing project that builded by [Brunch](http://brunch.io/) build tool which uses [Common.js require](https://github.com/brunch/commonjs-require-definition). Generally it useful when you want to generate [coverage](https://github.com/karma-runner/karma-coverage) for source files.

Configuration
---

```javascript

    module.exports = function(config) {
      config.set({

    ................

        plugins: [
          'karma-mocha',
          'karma-phantomjs-launcher',
          'karma-coverage',
          // add plugin
          'karma-commonjs-require'
        ],

    // add to framework list
    frameworks: ['mocha', 'common-require'],

    // You can define custom application root directory, by default is 'app'
    commonRequirePreprocessor: {
      appDir: 'app'
    },

    preprocessors: {
      'app/**/*.js' : ['common-require'],
      'test/**/*.js' : ['common-require']
    }

    ...............

      });
    };

```
