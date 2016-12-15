exports = module.exports = function (app, mongoose) {

    const schema = mongoose.Schema({
        good: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Good',
            required: true
        },
        date: {
            type: Date,
            required: true
        },
        phone: {
            type: String
        },
        source: {
            type: String
        }
    });

    schema.statics.getAll = function(callback) {
		const Selling = this;
        Selling.find().populate('good', 'name purchasePrice price').exec(function (err, sales) {
            if (err) return callback(err);
            return callback(null, sales);
        });
    };

    schema.statics.getByPeriod = function(startDate, endDate, callback) {
        const Selling = this;
        let query = {
            date: {
                $gte: startDate,
                $lte: endDate
            }
        };

        Selling.find(query).populate('good', 'name purchasePrice price').exec((err, sales) => callback(err, sales));
    };

    app.db.model('Selling', schema);
};
