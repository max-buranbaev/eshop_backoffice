"use strict"

var fs = require('fs');
var config = require('./config');

exports = module.exports = function(app) {

  app.get('/', function(req, res) {
    fs.readFile('views/index.html', 'utf8', function(err, text) {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.end(text);
    });
  });

  app.post('/goods/add', require('./views/goods/index.js').add);
  app.post('/goods/change', require('./views/goods/index.js').updateById);
  app.get('/goods/', require('./views/goods/index.js').getAll);
  app.get('/good/:id', require('./views/goods/index.js').getDataById);
  app.post('/goods/remove', require('./views/goods/index.js').deleteById);
  app.get('/createCategory', require('./views/categories/index.js').add);

}
