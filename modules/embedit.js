
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
        message: "Embedit does not support the provided url: " + url + '. Currently we support urls from ' + moduleKeys.join(', ') + "."
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

    // For some reason the below url will also match vine.co/v/:id, so we match the domain explicitely here
    if (url.indexOf('youtube') === -1 && url.indexOf('youtu.be') === -1) {
      return null;
    }

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

    var result = null;

    result = {
      title:        $('#eow-title').text().trim(),
      description:  $('#eow-description').text().trim(),
      thumbnail:    "http://img.youtube.com/vi/" + id + "/default.jpg",
      media:        "http://www.youtube.com/v/" + id,
      embed:        '<iframe width="560" height="315" src="//www.youtube.com/embed/' + id + '" frameborder="0" allowfullscreen></iframe>',
      mediaType:    "video",
      mediaFormat:  "flash",
      sourceType:   "youtube",
      sourceId:     id,
      shortUrl:     "http://youtu.be/" + id
    };

    return callback(null, result);
  },
};


/**
 * Embedit module that supports vine urls
 */
var vineModule = {

  moduleId: 'vine',

  match: function(url) {
    // TODO: Match shorturl and variations of the youtube url (eg. youtu.be)
    return this.getIdFromUrl(url) !== null;
  },

  getIdFromUrl: function(url) {

    // For some reason the below url will also match vine.co/v/:id, so we match the domain explicitely here
    if (url.indexOf('vine.co') === -1) {
      return null;
    }

    // Credit: http://stackoverflow.com/a/9102270/540194
    // TODO: Find out why the youtu.be at the beginning doesn't matter, it still matches vine
    var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    var match = url.match(regExp);

    if (match && match[2].length == 11){
        return match[2];
    }
      return null;
  },

  process: function(url, $, callback) {
    var id = this.getIdFromUrl(url);

    if (!id) {
      return callback({
        code: 'no_id_found',
        message: 'Could not find the source id for url: ' + url
      });
    }

    var result = null;

    result = {
      title:        $('meta[property="twitter:title"]').attr('content').trim(),
      description:  $('meta[property="twitter:description"]').attr('content').trim(),
      thumbnail:    $('meta[property="twitter:image"]').attr('content').trim(),
      media:        $('meta[property="twitter:player:stream"]').attr('content').trim(),
      mediaType:    "video",
      mediaFormat:  "mp4",
      sourceType:   "vine",
      sourceId:     id,
      embed:        '<iframe class="vine-embed" src="https://vine.co/v/' + id + '/embed/simple" width="600" height="600" frameborder="0"></iframe><script async src="//platform.vine.co/static/scripts/embed.js" charset="utf-8"></script>',
      shortUrl:     "https://vine.co/v/" + id
    };

    return callback(null, result);
  },
};


/**
 * Embedit module that supports instagram urls
 */
var instagramModule = {

  moduleId: 'instagram',

  match: function(url) {
    // TODO: Match shorturl and variations of the youtube url (eg. youtu.be)
    return this.getIdFromUrl(url) !== null;
  },

  getIdFromUrl: function(url) {

    // For some reason the below url will also match vine.co/v/:id, so we match the domain explicitely here
    if (url.indexOf('instagram.com') === -1 && url.indexOf('instagr.am') === -1) {
      return null;
    }

    // Credit: http://stackoverflow.com/a/9102270/540194
    // TODO: Find out why the youtu.be at the beginning doesn't matter, it still matches instagram (added a 'p')
    var regExp = /^.*(youtu.be\/|p\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    var match = url.match(regExp);

    // Instagram ids are 10 chars
    if (match && match[2].length > 0){
        return match[2];
    }
      return null;
  },

  process: function(url, $, callback) {
    var id = this.getIdFromUrl(url);

    if (!id) {
      return callback({
        code: 'no_id_found',
        message: 'Could not find the source id for url: ' + url
      });
    }

    var result = null;

    result = {
      title:        $('meta[property="og:description"]').attr('content').trim(),
      description:  null, // TODO: Get this from instagram api, can't scrape easily
      thumbnail:    $('meta[property="og:image"]').attr('content').trim(),
      // TODO: Use api for this
      media:        $('meta[property="og:image"]').attr('content').trim(),
      mediaType:    "image",
      mediaFormat:  "jpg",
      sourceType:   "instagram",
      sourceId:     id,
      embed:        '<iframe src="//instagram.com/p/' + id + '/embed/" width="612" height="710" frameborder="0" scrolling="no" allowtransparency="true"></iframe>',
      shortUrl:     "http://instagr.am/p/" + id
    };

    return callback(null, result);
  },
};

embedit.registerModule('youtube', youtubeModule);
embedit.registerModule('vine', vineModule);
embedit.registerModule('instagram', instagramModule);

var test = function() {

  var url = null;
  url = 'http://www.youtube.com/watch?v=rtUcsroeucg';
  url = 'https://vine.co/v/hWEgv65gzTr';
  url = 'http://instagram.com/p/cIuIvBrOXp';

  embedit.processUrl(url, function(err, result) {

    if (err) {
      console.log('Error: ' + err.message);
      return;
    }

    console.log('Result');
    console.log(result);
  });

};
// test();








