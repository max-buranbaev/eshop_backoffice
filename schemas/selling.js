'use strict'

exports = module.exports = function(app, mongoose) {

	var schema = mongoose.Schema({
		good: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Good',
			reqired: true
		},
		date: {
			type: Date,
			required: true
		},
		phone: {
			type: String
		},
		source: {
			type: String
		}
	})

	schema.statics.getAll = function(callback) {
	  var Selling = this;
	  Selling.find().populate('good', 'name purchasePrice price').exec(function(err, sales) {
		if (err) return callback(err);
		return callback(null, sales);
	  });
	}

	app.db.model('Selling', schema);
};
