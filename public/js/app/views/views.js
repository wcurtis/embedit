
window.MastheadView = Backbone.View.extend({

  events: {
    "click .btn": "onSubmit",
    "keypress input": "onKeypress"
  },

  initialize: function () {
    this.template = _.template($('#masthead-template').html());
  },

  render: function (eventName) {

    this.$el.html(this.template({
      data: this.options.data || {}
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

  initialize: function () {
    this.template = _.template($('#json-template').html());
    this.model = new Backbone.Model();
    app.vent.on('scrape:after', this.updateModel, this);
  },

  updateModel: function(model) {
    this.model = model;
    this.render();
  },

  render: function (eventName) {

    this.$el.html(this.template({
      data: this.model.toJSON()
    }));

    return this;
  },
});

window.EmbeddedView = Backbone.View.extend({

  initialize: function () {
    this.template = _.template($('#embedded-template').html());
    this.model = new Backbone.Model();
    app.vent.on('scrape:after', this.updateModel, this);
  },

  updateModel: function(model) {
    this.model = model;
    this.render();
  },

  render: function (eventName) {

    this.$el.html(this.template({
      data: this.model.toJSON()
    }));

    return this;
  },

});