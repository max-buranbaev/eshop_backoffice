'use strict';

exports = module.exports = function(app, mongoose) {

    var schema = new mongoose.Schema({
        description: {
            type: String,
            required: true
        },
        type: String,
        date: {
            type: Date,
            default: new Date()
        },
        amount: Number
    });

    schema.static.getAll = function(callback) {
        var Expenditure = this;
        Expenditure.find().exec( (err, expenditures) => callback(err, expenditures) );
    };

    app.db.model('Expenditure', schema);
};

