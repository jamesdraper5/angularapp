/**************************************************
 This file handles all the routes for tables
***************************************************/
var tableEngine = require('../data/tables');

exports.tables = function(req, res) {
  	res.render('tableListing', { title: 'This is the Listing Page' });
};

exports.table = function(req, res) {
	var opts = {tableId: parseInt(req.params.id)};
	var tableData = tableEngine.getTableEntries(req, res, opts, load);
};

function load( req, res, docs ) {
	//res.render('table', { title: 'Viewing table with id of ' + req.params.id, data: docs });
	res.json(docs);
}