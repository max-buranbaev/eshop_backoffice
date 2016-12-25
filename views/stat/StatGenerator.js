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
        let result = [];
        const dateStart = moment("01.09.2016", "DD.MM.YYYY");
        const dateEnd = moment();
        let cursor = dateStart.add(1, 'weeks');
        let prevCursor = dateStart;
        while(dateEnd.format('x') >= cursor.format('x')) {
            console.log(this.getFullStat(dateStart.format('x'), cursor.format('x')));
            result.push(this.getFullStat(dateStart.format('x'), cursor.format('x')));
            prevCursor = cursor;
            cursor.add(1, 'week');
        }
        return result;
    }

    getFullStat(dateStart, dateEnd) {
        return {
            averageCheck: this.getAverageCheck(dateStart, dateEnd, true),
            averageMarginPercent: this.getAverageMarginPercent(dateStart, dateEnd, true),
            conversion: this.getConversion(dateStart, dateEnd, true),
            profit: this.getProfit(dateStart, dateEnd, true),
            cashFlow: this.getCashFlow(dateStart, dateEnd, true),
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