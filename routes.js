"use strict"

var config = require('./config');
var Good = require('./models/good').Good;


exports = module.exports = function(app) {

  app.get('/dashboard', (req, res) => {
    res.send(200, "Hello!");
  });

  app.get('/createGood', (req, res) => {
      var good = new Good({
        name: "Подставка",
        purchasePrice: 2000,
        price: 2500
      });

      good.save( (err, good) => {
          res.status(200).send(good);
      });
  });
}
