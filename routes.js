"use strict";

const fs = require('fs');
const config = require('./config');

exports = module.exports = function (app) {

    app.get('/', function (req, res) {
        fs.readFile('views/index.html', 'utf8', function (err, text) {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(text);
        });
    });

    app.get('/api/goods/', require('./views/goods/index.js').getAll);
    app.get('/api/good/:id', require('./views/goods/index.js').getDataById);

    app.post('/api/goods/add', require('./views/goods/index.js').add);
    app.post('/api/goods/change', require('./views/goods/index.js').updateById);
    app.post('/api/goods/remove', require('./views/goods/index.js').deleteById);


    app.get('/api/sales/', require('./views/sellings/index.js').getAll);
    app.put('/api/sales/', require('./views/sellings/index.js').addSelling);
    app.delete('/api/sales/:id', require('./views/sellings/index.js').deleteSelling);

    app.post('/api/expenditures', require('./views/expenditures/index.js').create);
    app.get('/api/expenditures', require('./views/expenditures/index.js').read);
    app.delete('/api/expenditures/:id', require('./views/expenditures/index.js').delete);

    app.post('/api/stat/weekly/', require('./views/stat/index.js').getWeekly);
    app.post('/api/stat/', require('./views/stat/index.js').getAll);

    app.get('/api/categories/', require('./views/categories/index.js').getAll);

    app.get('/api/goods/sync/', require('./helpers/sync.js').sync);

};
