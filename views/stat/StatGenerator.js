const moment =require('moment');

module.exports = class StatGenerator {

    constructor(data, metrik) {
        this.data = data;
        this.metrik = metrik;
        let cashFlow = null;
        let sumOfMarginPercents = null;
        let goodsCost = null;

        this.data.map(selling => {
            cashFlow += selling.good.price;
            sumOfMarginPercents = 100 * (selling.good.price / selling.good.purchasePrice);
            goodsCost += selling.good.purchasePrice;
        });

        this.sumOfSales = this.data.length;
        this.averageCheck = Math.round((cashFlow / this.data.length) * 100) / 100;
        this.averageMarginPercent = Math.round((sumOfMarginPercents / this.data.length) * 100) / 100;
        this.profit = cashFlow - goodsCost;
        this.cashFlow = cashFlow;

        // binders
        this.getProfit = this.getProfit.bind(this);
        this.getGoodsExpenditures = this.getGoodsExpenditures.bind(this);
        this.getSumOfSales = this.getSumOfSales.bind(this);
        this.getCashFlow = this.getCashFlow.bind(this);
        this.getAverageMarginPercent = this.getAverageMarginPercent.bind(this);
        this.getProfit = this.getProfit.bind(this);
        this.getAverageCheck = this.getAverageCheck.bind(this);
        this.getConversion= this.getConversion.bind(this);
        this.getFullStat = this.getFullStat.bind(this);
        this.getWeekly = this.getWeekly.bind(this);
    }

    getWeekly() {
        let result = [{
            name: "average check",
            data: []
        }, {
            name: "average margin percent",
            data: []
        }, {
            name: "conversion",
            data: []
        }, {
            name: "profit",
            data: []
        }, {
            name: "cash flow",
            data: []
        }, {
            name: "sum of sales",
            data: []
        }];

        const dateStart = moment("01.09.2016", "DD.MM.YYYY");
        const dateEnd = moment();
        let cursor = dateStart.add(1, 'weeks');
        let prevCursor = dateStart;
        while(dateEnd.format('X') >= cursor.format('X')) {
            let newBatch = this.getFullStat(prevCursor.format('X'), cursor.format('X'));
            result[0]["data"].push(newBatch.averageCheck);
            result[1]["data"].push(newBatch.averageMarginPercent);
            result[2]["data"].push(newBatch.conversion);
            result[3]["data"].push(newBatch.profit);
            result[4]["data"].push(newBatch.cashFlow);
            result[5]["data"].push(newBatch.sumOfSales);
            prevCursor = moment(cursor.format());
            cursor.add(1, 'week');
        }
        return result;
    }

    getFullStat(dateStart, dateEnd) {
        return {
            averageCheck: this.getAverageCheck(dateStart, dateEnd),
            averageMarginPercent: this.getAverageMarginPercent(dateStart, dateEnd),
            conversion: this.getConversion(dateStart, dateEnd),
            profit: this.getProfit(dateStart, dateEnd),
            cashFlow: this.getCashFlow(dateStart, dateEnd),
            sumOfSales: this.getSumOfSales(dateStart, dateEnd),
        }
    }

    getSumOfSales(dateStart, dateEnd) {
        let sum = 0;
        this.data.map(selling => {
            if(moment(selling.date).format('X') >= dateStart && moment(selling.date).format('X') <= dateEnd) {
                sum++;
            }
        });
        return sum;
    }

    getCashFlow(dateStart, dateEnd) {
        let cashFlow = 0;
        this.data.map(selling => {
            if(moment(selling.date).format('X') >= dateStart && moment(selling.date).format('X') <= dateEnd) {
                cashFlow += selling.good.price;
            }
        });
        return cashFlow;
    }

    getAverageMarginPercent(dateStart, dateEnd) {
        let sumOfMarginPercents = 0;
        let counter = 0;
        let averageMarginPercent = 0;

        this.data.map(selling => {
            if(moment(selling.date).format('X') >= dateStart && moment(selling.date).format('X') <= dateEnd) {
                sumOfMarginPercents += 100 * (selling.good.price / selling.good.purchasePrice);
                counter++;
            }
        });

        averageMarginPercent = Math.round((sumOfMarginPercents / this.data.length));
        return averageMarginPercent;
    }

    getConversion(dateStart, dateEnd) {
        let sumOfVisitors = null;
        this.metrik.data.map(el => {
            if(el.dimensions[0]["id"] == "organic" || el.dimensions[0]["id"] == "ad") {
                sumOfVisitors += el.metrics[0]
            }
        });

        return this.getSumOfSales(dateStart, dateEnd) / sumOfVisitors;
    }

    getGoodsExpenditures(dateStart, dateEnd) {
        let goodsExpenditures = 0;
        this.data.map(selling => {
            if(moment(selling.date).format('X') >= dateStart && moment(selling.date).format('X') <= dateEnd) {
                goodsExpenditures += selling.good.purchasePrice;
            }
        });
        return goodsExpenditures;
    }

    getProfit(dateStart, dateEnd) {
        let result = this.getCashFlow(dateStart, dateEnd) - this.getGoodsExpenditures(dateStart, dateEnd);
        return result;
    }

    getAverageCheck(dateStart, dateEnd) {
        let averageCheck = Math.round((this.getCashFlow(dateStart, dateEnd) / this.getSumOfSales(dateStart, dateEnd)) * 100) / 100;
        return averageCheck;
    }
};