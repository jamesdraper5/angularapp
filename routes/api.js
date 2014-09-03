/**************************************************
 Routes for tables
***************************************************/
var tableEngine = require('../data/tables');

exports.tables = {
	self: this,
	getAllTables: function(req, res) {
	  	var opts = {};
	  	var tableData = tableEngine.getAllTables(req, res, function(req, res, docs){
	  		// Internal error, probably passed incorrect hex value for table id
	  		if ( docs === null ) {
	  			res.status(404).json({
	  				status: 'error',
	  				message: 'Not Found'
	  			})
	  		} else {
	  			res.json(docs);
	  		}
	  	});
	},
	getTableById: function(req, res) {
		var tableData = tableEngine.getTableById(req, res, function(req, res, docs){
	  		// Internal error, probably passed incorrect hex value for table id
	  		if ( docs === null ) {
	  			res.status(404).json({
	  				status: 'error',
	  				message: 'Not Found'
	  			})
	  		} else {
	  			res.json(docs);
	  		}
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