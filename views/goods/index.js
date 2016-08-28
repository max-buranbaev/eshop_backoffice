'use strict'

exports.add = function(req, res, next) {
  var db = req.app.db;
  var Good = db.model('Good');

  var newGood = new Good();
  newGood.name = "Костыли";
  newGood.purchasePrice = 2001;
  newGood.price = 2501;
  newGood.category = "57c2ca1c22af4ce40c51a9e2",
  newGood.save( (err, good) => {
      res.send(200, good);
  });
}

exports.getDataById = function(req, res, next) {
  var Good = req.app.db.models.Good;
  Good.getDataById(req.params.id, function(err, good) {
    if (err) return next(err);
    res.status(200).send(good);
  });
}

exports.updateById = function(req, res, next) {
    var Good = req.app.db.models.Good;
    var newGoodData = {
      name: req.body.name,
      purchasePrice: req.body.purchasePrice,
      price: req.body.price,
      category: req.body.category
    }

    console.log(req.params);

    Good.updateDataById(req.params.id, newGoodData, function(err, newGood) {
      if (err) return next(err);
      res.status(200).send(newGood);
    });
}

exports.deleteById = function(req, res, next) {
  var Good = req.app.db.models.Good;
  Good.findByIdAndRemove(req.params.id, function(err) {
    if(err) {
      res.status(404).end();
    } else {
      res.status(200).send("ok").end();
    }
  });
}
