karma-ember-precompiler-brunch
===

Usage
===

```javascript
    .......

    // Include to plugins list
    plugins: [
      'karma-ember-precompiler-brunch'
    ],

    // Create configuration
    emberPrecompilerBrunchPreprocessor: {
      jqueryPath: 'path/to/jquery.js',
      handlebarsPath: 'path/to/handlebars.js'
      emberPath: 'path/to/ember.js',
    },

    // Use it! :)
    preprocessors: {
      '**/*.hbs': 'ember-precompiler-brunch'
    }
```