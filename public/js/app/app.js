
var AppRouter = Backbone.Router.extend({

  account: null,

  initialize:function () {
    this.vent = _.extend({}, Backbone.Events);

    this.vent.on('try', this.onTry, this);

    return;
  },

  routes:{
    "":"showHome",
  },

  setup: function(callback) {
    var self = this;
    callback();
  },

  onTry: function(data) {

    var url = data.url;

    console.log('try ' + url);

  },

  showHome: function() {

    var self = this;

    this.setup(function() {
      var mastheadView = new MastheadView();
      $('#masthead').html(mastheadView.render().el);
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
