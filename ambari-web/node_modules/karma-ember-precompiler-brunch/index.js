var jsdom = require('jsdom');
var fs = require('fs');

/*
  configs
    @param jqueryPath {String} - path to jquery.js
    @param handlebarsPath {String} - path to handlebars.js
    @param emberPath {String} - path to ember.js
*/

var createEmberBrunchPrecompilePreprocessor = function(config, logger) {
  var log  = logger.create('preprocessor:ember-precompiler-brunch');
  var doc = null;
  if (!config || !config.jqueryPath || !config.emberPath || !config.handlebarsPath) {
    log.error('You should specify all necessary configuration properties: `jqueryPath`, `handlebarsPath`, `emberPath`');
  } else {
    doc = jsdom.jsdom().createWindow();
    doc.run(fs.readFileSync(config.jqueryPath, 'utf8'));
    doc.run(fs.readFileSync(config.handlebarsPath, 'utf8'));
    doc.run(fs.readFileSync(config.emberPath, 'utf8'));
  }

  return function(content, file, done) {
    var processed = null;
    try {
      var compiled = doc.Ember.Handlebars.precompile(content);
      log.debug("Precompiling %s", file.originalPath);
      processed = "Ember.TEMPLATES[module.id] = Ember.Handlebars.template(" + compiled + ");\nmodule.exports = module.id;";
    } catch (e) {
      log.error("%s\n at %s", e.message, file.originalPath);
    }

    done(processed);
  }
}

createEmberBrunchPrecompilePreprocessor.$inject = ['config.emberPrecompilerBrunchPreprocessor', 'logger']

module.exports = {
  'preprocessor:ember-precompiler-brunch': ['factory', createEmberBrunchPrecompilePreprocessor]
}