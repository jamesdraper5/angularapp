/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index');
};


/*
 * Render partial
 */

exports.partials = function (req, res) {
  var name = req.params.name;
  res.render('partials/' + name);
};


/*
 * Render error
 */

exports.showError = function (req, res) {
	console.log('req', req);
	res.render('partials/error');
};