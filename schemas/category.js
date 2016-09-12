'use strict'

var _ = require('loDash');

exports = module.exports = function(app, mongoose) {

  var schema = mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    siteId: {
      type: Number,
      required:true,
      unique: true
    }
  });

  schema.statics.getAll = function(callback) {
    var Category = this;

    Category.find({}, 'name', function(err, categories) {
      if (err) return callback(err);
      return callback(null, categories);
    });

  }

  schema.statics.add = function(siteId, name, callback) {
    var Category = this;

    var newCategory = new Category();
    newCategory.name = name;
    newCategory.siteId = siteId;

    newCategory.save( (err, category) => {
        callback(category);
    });
    
  }

  schema.statics.checkAndAdd = function(category, callback) {
    var Category = this;

    Category.find({ siteId: category.id }, 'name', function(err, result) {
      if (err) next(err);

      if(_.isEmpty(result)) {
        this.statics.add(category, callback(category));
      } else {
        this.statis.updateById(result, callback(category));
      }
    });

  }

  schema.statics.updateIfExists = function(callback) {
    var Category = this;

  }

  app.db.model('Category', schema);

}
