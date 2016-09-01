'use strict'

exports.add = function(req, res) {
    var db = req.app.db;
    var Category = db.model('Category');

    var newCategory = new Category();
    newCategory.name = req.body.name;

    newCategory.save( (err, category) => {
        res.send(200, category);
    });
}

exports.getAll = function(req, res, next) {
  var db = req.app.db;
  var Category = db.model('Category');

  Category.getAll(function(err, goods) {
    if (err) return next(err);
    res.status(200).send(goods);
  });
}

exports.deleteById = function(req, res, next) {
  var Category = req.app.db.models.Category;
  console.log("Somebody removes category with id = " + req.body.id);
  Category.findByIdAndRemove(req.body.id, function(err) {
    if(err) {
      res.status(404).end();
    } else {
      res.status(200).send(req.body.id).end();
    }
  });
}
