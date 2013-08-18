
window.Scrape = Backbone.Model.extend({

  initialize: function(options) {

    this.params = options.params || {};
  },

  urlRoot: function() {
    return 'api/scrape' + this.getParamString();
  },

  setParam: function(key, value) {
    this.params[key] = value;
    return this;
  },

  getParams: function() {
    return _.defaults(this.params, this.defaultParams);
  },

  getParamString: function() {
    var params = this.getParams();
    var str = "?";
    for (var key in params) {
        if (str !== "") {
            str += "&";
        }
        str += key + "=" + params[key];
    }
    return str;
  }

});