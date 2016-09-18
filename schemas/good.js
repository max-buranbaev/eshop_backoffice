'use strict'

var _ = require('loDash');

exports = module.exports = function(app, mongoose) {

  var schema = mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    purchasePrice: {
      type: Number
    },
    price: {
      type: Number,
      required: true
    },
    siteId: {
      type: Number,
      require: true,
      unique: true
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category'
    }
  });

  schema.statics.getAll = function(callback) {
    var Good = this;
    Good.find({}, 'name purchasePrice price siteId').populate('category._id').exec(function(err, goods) {
      if (err) return callback(err);
      return callback(null, goods);
    });
  }

  schema.statics.getByCategory = function(id) {
    var Good = this;
    var query = Good.find({ category: id });
    var promise = query.exec();

    promise.addBack( (err, goods) => {
      if(err) next(err);

      return goods; 
    });
  }

  schema.statics.getDataById = function(id, callback) {
    var Good = this;
    Good.findById(id).populate('category').exec( function(err, good) {
      if (err) return callback(err);

      return callback(null, good);
    });
  }

  schema.statics.add = function(good, callback) {
    var Good = this;
    var newGood = new Good();

    newGood.name = good.name;
    newGood.siteId = parseInt(good.id);
    newGood.purchasePrice = parseInt(good.purchasePrice);
    newGood.price = parseInt(good.price);
    newGood.category = good.category;
    newGood.save( (err, good) => {
        callback();
    });
  }

  schema.statics.updateDataById = function(id, newGoodData, callback) {
      var Good = this;

      Good.findById(id).exec(function(err, good) {

        if (!good) {
          return callback(new HttpError(404, "Good not found"));
        }


        good.name = newGoodData.name;
        good.purchasePrice = newGoodData.purchasePrice;
        good.price = newGoodData.price;
        good.category = newGoodData.category;

        good.save(function(err) {
          if (err) return callback(err);
          return callback();
        });

      });
  }

  schema.statics.checkAndAdd = function(offer, callback) {
    var Good = this;

    Good.find({ siteId: offer.id }, '_id', function(err, findedOffer) {
      if (err) next(err);
      if(_.isEmpty(findedOffer)) {
        Good.add(offer, callback);
      } else {
        Good.update({ siteId: offer.id }, { name: offer.name, purchasePrice: offer.purchasePrice, price: offer.price }, "", callback)
      }
    });

  }

  app.db.model('Good', schema);

};
