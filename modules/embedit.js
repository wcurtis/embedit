
var _ = require('underscore');

var embedit = exports.embedit = {

  modules: [],

  registerModule: function(key, module) {
    this.modules[key] = module;
  },

  processUrl: function(url, callback) {

    var result = null;
    var matchedModule = null;

    matchedModule = _.find(this.modules, function(module) {
      return module.match(url);
    });

    // Callback an error if no module supports the url
    if (!matchedModule) {
      return callback({
        message: "Url did not match a supported module"
      });
    }

    matchedModule.processUrl(callback);
  }

};

var youtubeModule = {

  moduleId: 'youtube',

  match: function(url) {
    // TODO: Match shorturl and variations of the youtube url (eg. youtu.be)
    return url.indexOf('youtube.com') !== -1;
  },

  getIdFromUrl: function(url) {
    // TODO: Implement
    return '3DrtUcsroeucg';
  },

  process: function(url, id, callback) {

    var result = {};

    result.sourceId = id;
    result.originalUrl = url;
    result.shortUrl = 'http://youtu.be/3DrtUcsroeucg';

    return callback(null, result);
  }

};

embedit.registerModule('youtube', youtubeModule);

var test = function() {

  embedit.processUrl('http://www.youtube.com/watch?v=rtUcsroeucg', function(err, result) {

    if (err) {
      console.log('Error: ' + err.message);
      return;
    }

    console.log('Result');
    console.log(result);
  });

};
test();








