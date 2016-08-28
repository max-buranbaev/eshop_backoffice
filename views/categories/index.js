'use strict'

exports.add = function(req, res) {
    var db = req.app.db;
    var Category = db.model('Category');

    var newCategory = new Category();
    newCategory.name = "Категория 2";

    newCategory.save( (err, category) => {
        res.send(200, category);
    });
}
