
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

    var value = this.$('.url-input').val();
    console.log("clicked " + value);
    return false;
  }
});