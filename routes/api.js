/**************************************************
 Routes for tables
***************************************************/
var tableEngine = require('../data/tables');

exports.tables = function(req, res) {
  	//res.render('tableListing', { title: 'This is the Listing Page' });
  	var opts = {};
  	var tableData = tableEngine.getTableEntries(req, res, opts, load);
};

exports.table = function(req, res) {
	console.log('req', req.params);
	var opts = {tableId: req.params.id};
	var tableData = tableEngine.getTableEntries(req, res, opts, load);
};

function load( req, res, docs ) {
	//res.render('partials/table', { title: 'Viewing table with id of ' + req.params.id, data: docs });
	res.json(docs);
}