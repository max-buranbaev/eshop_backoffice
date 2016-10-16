var config = require('./config');
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var path = require('path');
var app = express();

// DB
mongoose.Promise = global.Promise;
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

app.use(function (err, req, res, next) {
    if(err) {
        const { name, message } = err;
        switch(name) {
            case "MissingSchemaError":
                res.status(206).send(message);
                console.log(err);
                break;

            default:
                console.log(err);
                res.status(500);
                break;

        }
    }
});

// start listening
app.listen(config.port, () => {
    console.log('Example app listening on port ' + config.port + '!');
});
