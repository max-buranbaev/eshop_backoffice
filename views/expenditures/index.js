'use strict';

exports.create = function(req, res, next) {
    const Expenditure = req.app.db.models.Expenditure;
    let newItem = new Expenditure(req.body.item);
    newItem.save( (err, expenditure) => {
        if(err) next(err);
        res.status(200).send(expenditure);
    });
};

exports.read = function(req, res, next) {
    const Expenditure = req.app.db.model('Expenditure');

    Expenditure.find().exec( (err, expenditures) => {
        if(err) next(err);
        res.status(200).send(expenditures);
    })
};

exports.delete = function(req, res, next) {
    const Expenditure = req.app.db.model('Expenditure');

    Expenditure.findByIdAndRemove(req.params.id, (err) => {
        if(err) next(err);

        res.status(200).send(req.params.id);
    });
};
