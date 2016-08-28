var Good = require('../../models/good').Good;

exports.add = function(req, res) {

    var good = new Good({
      name: "Подставка 2",
      purchasePrice: 20001,
      price: 23232,
      category: "57c2b648126dafe50b86f86f"
    });

    good.save( (err, good) => {
        res.send(200, good);
    });

}
