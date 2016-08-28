"use strict"

var config = require('./config');

exports = module.exports = function(app) {

  app.get('/dashboard', (req, res) => {
    res.send(200, "Hello!");
  });

  app.get('/createGood', require('./views/goods/index.js').add);
  app.get('/updateGood/:id', require('./views/goods/index.js').updateById);
  app.get('/good/:id', require('./views/goods/index.js').getDataById);
  app.get('/goodDelete/:id', require('./views/goods/index.js').deleteById);
  app.get('/createCategory', require('./views/categories/index.js').add);

}
