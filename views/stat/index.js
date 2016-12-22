const moment = require('moment');
const axios = require('axios');
const StatGenerator = require('./StatGenerator');

exports.getAll = (req, res, next) => {
    const Selling = req.app.db.models.Selling;
    console.log(req.body);
    const startDate = moment(req.body.item.startDate, "DD.MM.YYYY");
    const endDate = moment(req.body.item.endDate, "DD.MM.YYYY");
    const yaMetrikApi = `https://api-metrika.yandex.ru/stat/v1/data.json?id=32372795&date1=${startDate.format("YYYY-MM-DD")}&date2=${endDate.format("YYYY-MM-DD")}&metrics=ym:s:users&dimensions=ym:s:<attribution>TrafficSource&oauth_token=AQAAAAAT0xGsAAPpjNcTKg7nkUIJi7UFsCNRKcw`;

    const callback = (err, data) => {
        if(err) next(err);

        const Stat = new StatGenerator(data);
        axios.get(yaMetrikApi).then(response => {

            let sumOfVisitors = null;

            response.data.data.map(el => {
                if(el.dimensions[0]["id"] == "organic" || el.dimensions[0]["id"] == "ad") {
                    sumOfVisitors += el.metrics[0]
                }
            });

            let result = {
                query: {
                    startDate: startDate,
                    endDate: endDate
                },
                stat: {
                    averageCheck: Stat.averageCheck,
                    averageMarginPercent: Stat.averageMarginPercent,
                    conversion: Math.round((data.length / sumOfVisitors) * 10000) / 100,
                    profit: Stat.profit,
                    cashflow: Stat.cashFlow,
                    sumOfSales: Stat.sumOfSales
                }
            };

            res.send(result);
        });

    };

    Selling.getByPeriod(startDate.format(), endDate.format(), callback);
};

