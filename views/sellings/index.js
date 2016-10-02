'use strict'

exports.addSelling = function(req, res, next) {
    var db = req.app.db;
    var Selling = db.model('Selling');
    console.log(req.body);
    var newSelling = new Selling();
    newSelling.good = req.body.id;
    newSelling.phone = req.body.phone;
    newSelling.source = req.body.source;
    newSelling.date = req.body.date;

    newSelling.save(function(err, selling) {
        if (err) next(err);

        res.status(200).send(selling);
    });
}

exports.getAll = function(req, res, next) {
    var db = req.app.db;
    var Selling = db.model('Selling');
    Selling.getAll(function(err, sales) {
        if (err) return next(err);
        res.status(200).send(sales);
    });
}

exports.deleteSelling = function(req, res, next) {
    var db = req.app.db;
    var Selling = db.model('Selling');
    Selling.findOneAndRemove({_id: req.params.id}, null, function(err, selling) {
        if(err) next(err);
        res.status(200).send(selling);
    });
}
