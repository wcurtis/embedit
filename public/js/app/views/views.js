
window.MastheadView = Backbone.View.extend({

  events: {
    "click .btn-embedit": "onSubmit",
    "keypress input": "onKeypress",
    "click .supported-brands a": "onBrandClick"
  },

  exampleUrls: {
    youtube:    "http://www.youtube.com/watch?v=21OH0wlkfbc",
    instagram:  "http://instagram.com/p/JQbmP",
    vine:       "https://vine.co/v/hWEgv65gzTr"
  },

  initialize: function () {
    this.template = _.template($('#masthead-template').html());
    app.vent.on('scrape:after', this.onScrapeAfter, this);
  },

  render: function (eventName) {

    var brands = _.keys(this.exampleUrls);

    this.$el.html(this.template({
      data: this.options.data || {},
      supportedBrands: brands
    }));

    this.$('.btn-embedit').button();

    return this;
  },

  onKeypress: function(e) {

    // Submit on enter
    if (e.which == 13) {
      this.$(".btn").click();
      return false;
    }
  },

  onSubmit: function(e) {

    var url = this.$('.url-input').val();

    // Set button to a loading state
    this.$('.btn-embedit').button('loading');

    app.vent.trigger('scrape', {
      url: url
    });
    return false;
  },

  onBrandClick: function(e) {

    var $item = $(e.currentTarget);
    var key = $item.data('key');
    var url = this.exampleUrls[key];

    // Submit the url through the input field
    this.$('.url-input').val(url);
    this.$('.btn-embedit').click();

    return false;
  },

  onScrapeAfter: function(data) {
    this.$('.btn-embedit').button('reset');
  }
});

window.ContentView = Backbone.View.extend({

  initialize: function () {
    this.template = _.template($('#content-template').html());
  },

  render: function (eventName) {
    this.$el.html(this.template());
    return this;
  },
});

window.JsonView = Backbone.View.extend({

  events: {
    "mouseenter .json-item": "onItemHover"
  },

  initialize: function () {
    this.template = _.template($('#json-template').html());
    this.model = new Backbone.Model();
    app.vent.on('scrape:after', this.updateModel, this);
  },

  updateModel: function(data) {
    this.model = data.model;
    this.url = data.url;
    this.render();
  },

  render: function (eventName) {

    this.$el.html(this.template({
      data: this.model.toJSON(),
      url: this.url || ''
    }));

    // Don't want to show anything except skeleton if no url present yet
    if (!_.isString(this.url)) {
      this.$('.with-url').html('&nbsp;');
    }

    return this;
  },

  onItemHover: function(e) {

    var $item = $(e.currentTarget);
    var key = $item.data('key');
    app.vent.trigger('json:highlight', { key: key });
  }
});

window.EmbeddedView = Backbone.View.extend({

  initialize: function () {
    this.template = _.template($('#embedded-template').html());
    this.model = new Backbone.Model();
    app.vent.on('scrape:after', this.updateModel, this);
    app.vent.on('json:highlight', this.onJsonHightlight, this);
  },

  updateModel: function(data) {
    this.model = data.model;
    this.render();
  },

  render: function (eventName) {

    this.$el.html(this.template({
      data: this.model.toJSON()
    }));

    // Don't want to show anything except skeleton if no url present yet
    if (_.isEmpty(this.model.toJSON())) {
      this.$('.with-url').html('&nbsp;');
    }

    return this;
  },

  onJsonHightlight: function(data) {

    // TODO: Find a way to highlight the parts being used

    var key = data.key;

    this.$('.focused').removeClass('focused');
    this.$("[data-key*='" + key + "']").addClass('focused');
  }

});