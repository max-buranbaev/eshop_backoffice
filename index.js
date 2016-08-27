var config = require('./config');
var express = require('express');
var app = express();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

require('./routes')(app);

app.listen(config.port, () => {
  console.log('Example app listening on port ' + config.port + '!');
});
