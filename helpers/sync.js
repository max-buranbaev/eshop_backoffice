"use strict"

var request = require("request");
var fs = require("fs");
var xml2js = require('xml2js');
var parser = new xml2js.Parser();

exports.sync = function(req, res, next) {
  var db = req.app.db;
  var Category = db.model('Category');

  request('https://dokis.ru/export.xml', function(error, response, body) {
    parser.parseString(body, function (err, result) {

      result.shop.categories[0].category.map( (cat) => {
        var callback = function(err, category) {
          if(err) next(err);
          console.log(category);
        }

        Category.checkAndAdd(
          {
            id: cat.$.id,
            name: cat._
          },
          callback
        )
      });

      res.status(200).send(result.shop.categories[0].category);
    });
  });
}
