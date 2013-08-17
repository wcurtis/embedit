
var _ = require('underscore')
  , request = require('request')
  , jsdom = require('jsdom')
  ;


var embedit = exports.embedit = {

  modules: {},

  registerModule: function(key, module) {
    this.modules[key] = module;
  },

  /**
   * Takes a url, calls back with the embedit page data
   * if the url is supported by the registered plugins.
   * 
   * @param  string   url
   * @param  {Function} callback(err, embeditPage)
   */
  processUrl: function(url, callback) {

    var self = this;

    var result = null;
    var matchedModule = null;

    // Call match() on each module
    var moduleKeys = _.keys(this.modules);
    var matchedKey = _.find(moduleKeys, function(moduleKey) {
      var module = self.modules[moduleKey];
      return module.match(url);
    });

    matchedModule = this.modules[matchedKey] || null;

    // Callback an error if no module supports the url
    if (!matchedModule) {
      return callback({
        code: "url_not_supported",
        message: "Embedit does not support the provided url type.. yet."
      });
    }

    console.log("Matched url to module: " + matchedKey);
    console.log("Fetching url: " + url);
    this.fetchSite(url, function(err, window) {
      console.log("Processing page");
      matchedModule.process(url, window.$, callback);
    });
  },

  fetchSite: function(url, callback) {

    request(url, function(err, resp, body) {
      if (err) return callback(err);

      jsdom.env({
        html: body,
        scripts: ['http://code.jquery.com/jquery-1.6.min.js']
      }, function(err, window){
        if (err) return callback(err);

        //Use jQuery just as in a regular HTML page
        window.$ = window.jQuery;
        callback(null, window);
      });
    });

  },

};

/**
 * Embedit module that supports youtube urls
 */
var youtubeModule = {

  moduleId: 'youtube',
  shortUrl: 'http://youtu.be/:id',

  match: function(url) {
    // TODO: Match shorturl and variations of the youtube url (eg. youtu.be)
    return this.getIdFromUrl(url) !== null;
  },

  getIdFromUrl: function(url) {

    // Credit: http://stackoverflow.com/a/9102270/540194
    var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    var match = url.match(regExp);

    if (match && match[2].length == 11){
        return match[2];
    }
      return null;
  },

  process: function(url, $, callback) {
    var id = this.getIdFromUrl(url);

    var result = {};

    result.sourceId = id;
    result.originalUrl = url;
    result.shortUrl = this.shortUrl.replace(':id', id);

    return callback(null, result);
  },
};

embedit.registerModule('youtube', youtubeModule);

var test = function() {

  var url = null;
  url = 'http://www.youtube.com/watch?v=rtUcsroeucg';

  embedit.processUrl(url, function(err, result) {

    if (err) {
      console.log('Error: ' + err.message);
      return;
    }

    console.log('Result');
    console.log(result);
  });

};
test();








