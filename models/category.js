var mongoose = require('../libs/mongoose');

var schema = mongoose.Schema({
  name: {
    type: String,
    required: true
  }
});

exports.Category = mongoose.model('Category', schema);
