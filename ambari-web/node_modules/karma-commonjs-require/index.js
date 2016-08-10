var path = require('path');

/**
  Config
    @param appDir {String} - application root directory name of this directory will be removed while create path to module
*/

var createCommonRequirePreprocessor = function(args, logger, config, basePath) {
  var log  = logger.create('preprocessor:common-require');
  var appDir = config.appDir || 'app';
  return function(content, file, done) {
    var processed = null;
    var modulePath = file.path.replace(basePath, '').replace(new RegExp("\/" + appDir + "\/"), "").replace(/^\//, '').replace(path.extname(file.path), '');
    log.debug('Processing %s register module "%s"', file.path, modulePath);
    try {
      processed = ";require.register(\""+ modulePath +"\", function(exports, require, module){\n" + content + "\n})";
    } catch (e) {
      log.errror("%s\n at %s", e.message, file.originalPath);
    }

    done(processed);
  }
};

var createPattern = function(path) {
  return {pattern: path, included: true, served: true, watched: false};
};

var initCommonRequire = function(files) {
  files.unshift(createPattern(__dirname + '/node_modules/commonjs-require-definition/require.js'));
}



createCommonRequirePreprocessor.$inject = ['args', 'logger', 'config.commonRequirePreprocessor', 'config.basePath'];
initCommonRequire.$inject = ['config.files'];

module.exports = {
  'framework:common-require': ['factory', initCommonRequire],
  'preprocessor:common-require': ['factory', createCommonRequirePreprocessor]
}
