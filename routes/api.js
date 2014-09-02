/**************************************************
 Routes for tables
***************************************************/
var tableEngine = require('../data/tables');

exports.tables = {
	self: this,
	getAllTables: function(req, res) {
	  	var opts = {};
	  	var tableData = tableEngine.getTableEntries(req, res, opts, function(req, res, docs){
	  		res.json(docs);
	  	});
	},
	getTableById: function(req, res) {
		console.log('getTableById - req', req.params);
		var tableData = tableEngine.getTableEntries(req, res, null, function(req, res, docs){
	  		res.json(docs);
	  	});
	},
	createEntry: function(req, res) {
		var entry = req.body;
		var tableData = tableEngine.createTableEntry(entry, function(result){
	  		res.json(result);
	  	});
	},


}; 




/**************************************************
 Routes for table entries
***************************************************/