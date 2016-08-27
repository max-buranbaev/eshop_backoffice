"use strict"

var config = require('./config');

exports = module.exports = function(app) {

  app.get('/dashboard', (req, res) => {
    res.send(200, "Hello!");
  });

  app.get('/createGood', require('./views/goods/index.js').add);
  app.get('/createCategory', require('./views/categories/index.js').add);

}
