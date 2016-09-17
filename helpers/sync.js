"use strict"

var request = require("request");
var fs = require("fs");
var xml2js = require('xml2js');
var parser = new xml2js.Parser();

exports.sync = function(req, res, next) {
  var db = req.app.db;
  var Category = db.model('Category');
  var Good = db.model('Good');

  request('https://dokis.ru/export.xml', function(error, response, body) {
    parser.parseString(body, function (err, result) {

      result.shop.categories[0].category.map( (cat) => {
        var callback = function(err, category) {
          if(err) next(err);
        }

        Category.checkAndAdd(
          {
            id: cat.$.id,
            name: cat._
          },
          callback
        )
      });

      result.shop.offers[0].offer.map( (offer) => {
        var callback = function(err, offer) {
          if(err) next(err);
        }

        Good.checkAndAdd(
          {
            id: offer.$.id,
            name: offer.name,
            purchasePrice: offer.purchase_price,
            price: offer.price,
            categorySite: Category.getIdbySiteId(offer.id)
          },
          callback
        )

      });

      res.status(200).send(result.shop.offers[0].offer);
    });
  });
}
