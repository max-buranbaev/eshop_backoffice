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

  app.get('/goods/', require('./views/goods/index.js').getAll);
  app.get('/good/:id', require('./views/goods/index.js').getDataById);

  app.post('/goods/add', require('./views/goods/index.js').add);
  app.post('/goods/change', require('./views/goods/index.js').updateById);
  app.post('/goods/remove', require('./views/goods/index.js').deleteById);


  app.get('/categories/', require('./views/categories/index.js').getAll)
  app.post('/categories/add', require('./views/categories/index.js').add);
  app.post('/categories/remove', require('./views/categories/index.js').deleteById);

  app.get('/sales/', require('./views/sellings/index.js').getAll);
  app.put('/sales/', require('./views/sellings/index.js').addSelling);
  app.delete('/sales/:id', require('./views/sellings/index.js').deleteSelling)

  app.post('/goods/sync', require('./helpers/sync.js').sync);

}
