'use strict'

exports.addSelling = function(req, res, next) {
	var db = req.app.db;
	var Selling = db.model('Selling');
	console.log(req.body);
	var newSelling = new Selling();
	newSelling.good = req.body.id;
	newSelling.phone = req.body.phone;
	newSelling.source = req.body.source;
	newSelling.date = Date.now();

	newSelling.save(function(err, selling) {
		if(err) next(err);

		res.status(200).send(selling);
	});
}