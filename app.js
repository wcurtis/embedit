
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

/**
 * Redirect naked domain to www
 */
app.use(function(req, res, next){
  if(req.headers.host === process.env.NAKED_DOMAIN) { 
    return res.redirect(301, process.env.BASE_URL + req.url);
  }
  next(); 
}); 

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

var pageApi = require('./routes/api/page')
  ;

app.get('/', routes.index);
app.get('/api/page', pageApi.get);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
