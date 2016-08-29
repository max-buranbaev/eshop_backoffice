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

        good.name = newGoodData.name;
        good.purchasePrice = newGoodData.purchasePrice;
        good.price = newGoodData.price;
        good.category = newGoodData.category;

        good.save(function(err) {
          if (err) return callback(err);
          return callback(null, good); 
        });

      });
  }

  app.db.model('Good', schema);

};