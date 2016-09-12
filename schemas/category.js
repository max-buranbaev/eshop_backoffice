'use strict'

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

  schema.statics.updateIfExists = function(callback) {
    var Category = this;

  }

  app.db.model('Category', schema);

}
