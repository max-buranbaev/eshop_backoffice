'use strict'

exports = module.exports = function(app, mongoose) {

  var schema = mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    purchasePrice: {
      type: Number,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category'
    }
  });

  schema.statics.getAll = function(callback) {
    var Good = this;
    Good.find({}, 'name purchasePrice price', function(err, goods) {
      if (err) return callback(err);
      return callback(null, goods);
    });
  }

  schema.statics.getDataById = function(id, callback) {
    var Good = this;
    Good.findById(id).populate('category').exec( function(err, good) {
      if (err) return callback(err);

      return callback(null, good);
    });
  }

  schema.statics.updateDataById = function(id, newGoodData, callback) {
      var Good = this;

      Good.findById(id).exec(function(err, good) {

        if (!good) {
          return callback(new HttpError(404, "Good not found"));
        }

        console.log(good);

        good.name = newGoodData.name;
        good.purchasePrice = newGoodData.purchasePrice;
        good.price = newGoodData.price;
        good.category = newGoodData.category;

        good.save(function(err) {
          console.log("schema is working... " + err + good);
          if (err) return callback(err);
          return callback(null, good);
        });

      });
  }

  app.db.model('Good', schema);

};
