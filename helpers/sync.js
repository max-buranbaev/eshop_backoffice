"use strict";

var request = require("request");
var fs = require("fs");
var xml2js = require('xml2js');
var parser = new xml2js.Parser();
var async = require('async');
var getAll = require('../views/goods/index.js').getAll;


exports.sync = function(req, res, next) {
    var db = req.app.db;
    var Category = db.model('Category');
    var Good = db.model('Good');

    async.waterfall([
        (callback) => {
            request('https://dokis.ru/export.xml', (err, response, body) => {
                callback(err, body);
            });
        },
        (body, callback) => {
            parser.parseString(body, (err, DOM) => {
                callback(err, DOM);
            });
        },
        (DOM, callback) => {
            DOM.shop.categories[0].category.map((cat) => {
                Category.checkAndAdd({
                        id: cat.$.id,
                        name: cat._
                    },
                    (err) => {
                        if(err) callback(err);
                    }
                )
            });
            callback(null, DOM);
        },
        (DOM, callback) => {
            DOM.shop.offers[0].offer.map((offer) => {
                Good.checkAndAdd({
                        id: offer.$.id,
                        name: offer.name,
                        purchasePrice: offer.purchase_price[0],
                        price: offer.price[0],
                        categorySite: Category.getIdbySiteId(offer.id)
                    },
                    (err) => {
                        if(err) callback(err);
                    }
                )
            });
            callback(null)
        }
    ],
        (err) => {
            if(err) console.log(err);
            console.log("Import Done");
            getAll(req, res, next);
        }

    )
};
