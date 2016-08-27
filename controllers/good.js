var Good = require('../models/good.js');

exports.goodController = {
  addGood: (newGood) => {
    var good = new Good({
      name: newGood.name,
      purchasePrice: newGood.purchasePrice,
      price: newGood.price
    });
  }
}
