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

	app.db.model('Selling', schema);
};