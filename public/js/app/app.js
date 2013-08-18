
var AppRouter = Backbone.Router.extend({

  account: null,

  initialize:function () {
    this.vent = _.extend({}, Backbone.Events);
    return;
  },

  routes:{
    "":"showHome",
  },

  setup: function(callback) {
    var self = this;
    callback();
  },

  showHome: function() {

    var self = this;

    this.setup(function() {

      var mastheadView = new MastheadView();
      $('#masthead').html(mastheadView.render().el);
      // Defaulting for dev
      mastheadView.$('input').val('http://www.youtube.com/watch?v=rtUcsroeucg');
      mastheadView.$('input').focus();

      var contentView = new ContentView();
      $('#content').html(contentView.render().el);

      var jsonView = new JsonView();
      $('#left').html(jsonView.render().el);

      var embeddedView = new EmbeddedView();
      $('#right').html(embeddedView.render().el);

    });
  },
});

$(function () {
  app = new AppRouter();
  Backbone.history.start({ 
    pushState: true,
  });

  // Cancels full page reloads and uses backbone router to navigate with pushstate <3
  $(document).on('click', 'a:not([data-bypass])', function (evt) {

    var href = $(this).attr('href');
    var protocol = this.protocol + '//';

    if (href.slice(protocol.length) !== protocol) {
      evt.preventDefault();
      app.navigate(href, true);
    }
  });
});
