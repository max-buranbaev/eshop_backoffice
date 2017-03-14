'use strict'

var _ = require('lodash');

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

    Category.find({}, 'name siteId', function(err, categories) {
      if (err) return callback(err);
      return callback(null, categories);
    });

  }

  schema.statics.add = function(category, callback) {
    var Category = this;

    var newCategory = new Category();
    newCategory.name = category.name;
    newCategory.siteId = category.id;
    newCategory.save( (err, category) => {
        return callback(null, category);
    });

  }

  schema.statics.getIdbySiteId = function(siteId) {
    var Category = this;
    Category.findOne({ siteId: siteId }, '_id', function(err, findedCategory) {
      return findedCategory.id;
    });
  }

  schema.statics.checkAndAdd = function(category, callback) {
    var Category = this;
    Category.find({ siteId: category.id }, '_id', function(err, findedCategory) {
      if (err) next(err);
      if(_.isEmpty(findedCategory)) {
        Category.add(category, callback);
      } else {
        Category.update({ siteId: category.id }, { name: category.name }, "", callback)
      }
    });

  }

  app.db.model('Category', schema);

}
