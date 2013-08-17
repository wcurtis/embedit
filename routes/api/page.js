
var embedit = require('../../modules/embedit').embedit;

exports.get = function(req, res){

  var url = 'http://www.youtube.com/watch?v=rtUcsroeucg';

  embedit.processUrl(url, function(err, result) {
    if (err) {
      return res.send(500, err);
    }

    res.send(result);
  });
};