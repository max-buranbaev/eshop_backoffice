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
        while(dateEnd.format('x') >= cursor.format('x')) {
            let newBatch = this.getFullStat(dateStart.format('x'), cursor.format('x'));
            result[0]["data"].push(newBatch.averageCheck);
            result[1]["data"].push(newBatch.averageMarginPercent);
            result[2]["data"].push(newBatch.conversion);
            result[3]["data"].push(newBatch.profit);
            result[4]["data"].push(newBatch.cashFlow);
            result[5]["data"].push(newBatch.sumOfSales);
            prevCursor = cursor;
            cursor.add(1, 'week');
        }
        console.log(result);
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
            if(moment(selling.date).format('x') >= dateStart && moment(selling.date).format('x') <= dateEnd) {
                sum++;
            }
        });
        return sum;
    }

    getCashFlow(dateStart, dateEnd, formatted) {
        let cashFlow = 0;
        this.data.map(selling => {
            if(moment(selling.date).format('x') >= dateStart && moment(selling.date).format('x') <= dateEnd) {
                cashFlow += selling.good.price;
            }
        });
        return formatted ? cashFlow + "₽" : cashFlow;
    }

    getAverageMarginPercent(dateStart, dateEnd, formatted) {
        let sumOfMarginPercents = 0;
        let counter = 0;
        let averageMarginPercent = 0;

        this.data.map(selling => {
            if(moment(selling.date).format('x') >= dateStart && moment(selling.date).format('x') <= dateEnd) {
                sumOfMarginPercents += 100 * (selling.good.price / selling.good.purchasePrice);
                counter++;
            }
        });

        averageMarginPercent = Math.round((sumOfMarginPercents / this.data.length));
        return formatted ? averageMarginPercent + "%" : averageMarginPercent;
    }

    getConversion(dateStart, dateEnd, formatted) {
        let sumOfVisitors = null;
        this.metrik.data.map(el => {
            if(el.dimensions[0]["id"] == "organic" || el.dimensions[0]["id"] == "ad") {
                sumOfVisitors += el.metrics[0]
            }
        });

        return this.getSumOfSales(dateStart, dateEnd) / sumOfVisitors;
    }

    getGoodsExpenditures(dateStart, dateEnd, formatted) {
        let goodsExpenditures = 0;
        this.data.map(selling => {
            if(moment(selling.date).format('x') >= dateStart && moment(selling.date).format('x') <= dateEnd) {
                goodsExpenditures += selling.good.purchasePrice;
            }
        });
        return formatted ? goodsExpenditures + "₽" : goodsExpenditures;
    }

    getProfit(dateStart, dateEnd, formatted) {
        let result = this.getCashFlow(dateStart, dateEnd) - this.getGoodsExpenditures(dateStart, dateEnd);
        return formatted ? result + "₽" : result;
    }

    getAverageCheck(dateStart, dateEnd, formatted) {
        let averageCheck = Math.round((this.getCashFlow(dateStart, dateEnd) / this.getSumOfSales(dateStart, dateEnd)) * 100) / 100;
        return formatted ? averageCheck + "₽" : averageCheck;
    }
};