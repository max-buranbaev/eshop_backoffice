'use strict'

exports = module.exports = function(app, mongoose) {

  var schema = mongoose.Schema({
    name: {
      type: String,
      required: true
    }
  });

  app.db.model('Category', schema);

}
