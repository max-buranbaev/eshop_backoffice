var mongoose = require('mongoose');
var config = require('../config');
mongoose.connect(config.db);

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
  }
});

exports.Good = mongoose.model('Good', schema);
