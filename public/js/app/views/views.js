
window.MastheadView = Backbone.View.extend({

  events: {
    "click .btn": "onSubmit",
    "keypress input": "onKeypress",
    "click .supported-brands a": "onBrandClick"
  },

  exampleUrls: {
    youtube: "http://www.youtube.com/watch?v=rtUcsroeucg",
    instagram: "http://instagram.com/p/cIuIvBrOXp",
    vine: "https://vine.co/v/hWEgv65gzTr"
  },

  initialize: function () {
    this.template = _.template($('#masthead-template').html());
  },

  render: function (eventName) {

    var brands = _.keys(this.exampleUrls);

    this.$el.html(this.template({
      data: this.options.data || {},
      supportedBrands: brands
    }));

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

    app.vent.trigger('scrape', {
      url: url
    });
    return false;
  },

  onBrandClick: function(e) {

    var $item = $(e.currentTarget);
    var key = $item.data('key');

    console.log('click ' + key);

    app.vent.trigger('scrape', { 
      url: this.exampleUrls[key]
    });
    return false;
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
  },

  updateModel: function(data) {
    this.model = data.model;
    this.render();
  },

  render: function (eventName) {

    this.$el.html(this.template({
      data: this.model.toJSON()
    }));

    return this;
  },

});