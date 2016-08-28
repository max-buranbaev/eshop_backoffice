var mongoose = require('../libs/mongoose');

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
    type: mongoose.Schema.Types.ObjectId
  }
});

exports.Good = mongoose.model('Good', schema);
