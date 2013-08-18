
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

    app.vent.trigger('try', {
      url: url
    });
    return false;
  }
});

window.EmbeddedView = Backbone.View.extend({

  initialize: function () {

    this.template = _.template($('#embedded-template').html());
    app.vent.on('try', this.onTry, this);
  },

  render: function (eventName) {

    var self = this;

    this.fetchModel(function(err) {
      self.$el.html(self.template());
    });

    return this;
  },

  fetchModel: function(callback) {

    if (!this.model) {
      return callback();
    }

    var model = this.model;
    model.fetch({success: function() {
      callback(null, model);
    }});
  },

  onTry: function(data) {

    this.model = new Scrape({
      params: {
        url: data.url
      }
    });

    this.render();

  }
});