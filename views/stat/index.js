const moment = require('moment');
const StatGenerator = require('./StatGenerator');

exports.getAll = (req, res, next) => {
    const Selling = req.app.db.models.Selling;

    const startDate = moment(req.body.startDate, "DD.MM.YYYY").format();
    const endDate = moment(req.body.endDate, "DD.MM.YYYY").format();

    const callback = (err, data) => {
        if(err) next(err);

        const Stat = new StatGenerator(data);

        let response = {
            query: {
                startDate: startDate,
                endDate: endDate
            },
            stat: {
                averageCheck: Stat.getAverageCheck(),
                averageMarginPercent: Stat.getAverageMarginPercent()
            }
        };

        res.send(response);
    };

    Selling.getByPeriod(startDate, endDate, callback);
};

