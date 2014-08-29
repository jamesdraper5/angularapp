var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/budget');

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'Mongoose connection error:'));

db.once('open', function() {
	// yay!
	console.log('connected to mongo');

	var tableSchema = new Schema({
		tableId: Number,
		name: String,
		desc: String
	});

	var entrySchema = new Schema({
		tableId: Number,
		date: { type: Date, default: Date.now },
		category: String,
		desc:   String,
		user: String,
		amount: Number
	});

	var Table = mongoose.model('Table', tableSchema);
	var Entry = mongoose.model('Entry', entrySchema);

	// List all available tables
	exports.getTables = function() {

	}

	// Show one particular table by id
	exports.getTable = function() {

	}

	// List all table rows that match the opts argument 
	exports.getTableEntries = function(req, res, opts, cb) {
		console.log( 'opts: ', opts );
		var data = null;
		var total = 0;
		//var id = parseInt( req.params.id  );
		var query = Entry.find(opts);
		query.exec(function (err, docs) {
			//console.log( 'err: ' + err );
			console.log( 'docs: ' + docs );
			data = docs;

			for ( i in data ) {
				total += data[i].amount;
				console.log( 'i.amount: ' + data[i].amount );
			}
			console.log( 'total: ', total );
			
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

});