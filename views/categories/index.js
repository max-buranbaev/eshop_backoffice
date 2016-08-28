var Category = require('../../models/category').Category;

exports.add = function(req, res) {

    var category = new Category({
      name: "Категория",
    });

    category.save( (err, category) => {
        res.send(200, category);
    });

}
