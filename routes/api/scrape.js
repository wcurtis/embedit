
var embedit = require('../../modules/embedit').embedit;

exports.get = function(req, res){

  var url = req.query.url || null;

  if (!url) {
    return res.send(402, "Missing required param 'url'");
  }

  embedit.processUrl(url, function(err, result) {
    if (err) {
      return res.send(400, {
        error: err
      });
    }

    res.send(result);
  });
};