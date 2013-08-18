
window.MastheadView = Backbone.View.extend({

  initialize: function () {
    this.template = _.template($('#masthead-template').html());
  },

  render: function (eventName) {

    this.$el.html(this.template({
      data: this.options.data || {}
    }));
    return this;
  }
});