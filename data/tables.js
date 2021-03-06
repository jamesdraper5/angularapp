/*****************************************************************************************************************************************
 This file does all the queries to the DB for anything table related.
 *****************************************************************************************************************************************/

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

mongoose.connect('mongodb://localhost/budgetApp');

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'Mongoose connection error:'));

db.once('open', function() {
	// yay!
	console.log('connected to mongo');


	var tableSchema = new Schema({
		name: String,
		desc: String,
		userId: ObjectId
	});

	var entrySchema = new Schema({
		tableId: ObjectId,
		date: { type: Date, default: Date.now },
		category: String,
		desc:   String,
		paidBy: String,
		amount: Number
	});

	var Table = mongoose.model('Table', tableSchema);
	var Entry = mongoose.model('Entry', entrySchema);

	// List all available tables
	exports.getAllTables = function(req, res, cb) {
		var data = null;
		var total = 0;

		try {
			var opts = {
				// TO DO: change this to SESSION.userId or whatever once login stuff is done
				userId: new mongoose.Types.ObjectId("54037e5448f0ad998eef3c5e")
			}
		} catch(e) {
			if ( cb ) {
				return cb(req, res, data);
			} else {
				return data;
			}
		}

		var query = Table.find(opts);
		query.exec(function (err, docs) {
			console.log( 'err: ' + err );
			data = docs;
			
			// Call the callback fn if one was specified, otherwise just return the data
			if ( cb ) {
				return cb(req, res, data);
			} else {
				return data;
			}

		});
	}

	// Show one particular table by id
	exports.getTableById = function(req, res, cb) {
		var tableObj = {};

		try {
			var opts = {
				tableId: new mongoose.Types.ObjectId(req.params.id)
			}
		} catch(e) {
			/*if ( cb ) {
				return cb(req, res, data);
			} else {
				return data;
			}*/
			console.log('e', e);
		}

		var getTable = Table.findById(req.params.id);
		var getEntries = Entry.find(opts);
		
		getTable.exec(function (err, result) {
			console.log( 'err: ' + err );
			tableObj.name = result.name;
			tableObj.desc = result.desc;
			
			getEntries.exec(function (err, docs) {
				console.log( 'err: ' + err );
				tableObj.entries = docs;
				
				// Call the callback fn if one was specified, otherwise just return the data
				if ( cb ) {
					return cb(req, res, tableObj);
				} else {
					return tableObj;
				}
			});
		});

		
		



	}

	// List all table rows that match the opts argument 
	exports.getTableEntries = function(req, res, opts, cb) {

		var data = null;
		var total = 0;

		if ( !opts ) {
			var opts = {
				tableId: new mongoose.Types.ObjectId(req.params.id)
			}
		}

		var query = Entry.find(opts);

		query.exec(function (err, docs) {
			console.log( 'err: ' + err );
			//console.log( 'docs: ' + docs );
			data = docs;
			
			// Call the callback fn if one was specified, otherwise just return the data
			if ( cb ) {
				return cb(req, res, docs);
			} else {
				return docs;
			}

		});
	}

	// Show one table entry by id
	exports.getTableEntry = function(id) {
		var data = null;
		var total = 0;
		var query = Entry.find({ id: id });
		query.exec(function (err, docs) {
			//console.log( 'err: ' + err );
			//console.log( 'docs: ' + docs );
			data = docs;

			for ( i in data ) {
				total += data[i].amount;
				console.log( 'i.amount: ' + data[i].amount );
			}
			console.log( 'total: ', total );

			return docs;
		});
	}

	// Create a new entry
	exports.createTableEntry = function(entry, cb) {
		console.log( 'entry: ', entry );
		
		var newEntry = new Entry(entry);
		newEntry.save(function (err, result, numberAffected) {
		  	if (err) {
		  		console.log('err', err);
		  	} else {

		  		// Call the callback fn if one was specified, otherwise just return the data
		  		if ( cb ) {
		  			return cb(result);
		  		} else {
		  			return result;
		  		}
		  	}
		});

	}

});