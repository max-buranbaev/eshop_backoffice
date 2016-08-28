'use strict'

exports = module.exports = function(app, mongoose) {
  require('./schemas/good')(app, mongoose);
  require('./schemas/category')(app, mongoose);
};
