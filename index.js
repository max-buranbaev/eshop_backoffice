var config = require('./config');
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var path = require('path');
var app = express();

// DB
app.db = mongoose.createConnection(config.db);
app.db.on('error', console.error.bind(console, 'mongoose connection error: '));
app.db.once('open', function () {
  console.log("We connect to mongodb");
});

// middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// models
require('./models')(app, mongoose);

// static
app.use(express.static(path.join(__dirname, 'public')));

// routes
require('./routes')(app);

// start listening
app.listen(config.port, () => {
  console.log('Example app listening on port ' + config.port + '!');
});
