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
    }

    getWeekly() {
        let result = [];
        return true;
    }

    getSumOfSales(dateStart, dateEnd) {
        let sum = 0;
        this.data.map(selling => {
            if(moment(selling.date).format('x') >= moment(dateStart).format('x') && moment(selling.date).format('x') <= moment(dateEnd).format('x')) {
                sum++;
            }
        });
        return sum;
    }

    getCashFlow(dateStart, dateEnd, formatted) {
        let cashFlow = 0;
        this.data.map(selling => {
            if(moment(selling.date).format('x') >= moment(dateStart).format('x') && moment(selling.date).format('x') <= moment(dateEnd).format('x')) {
                cashFlow += selling.good.price;
            }
        });
        console.log(formatted ? cashFlow + "₽" : cashFlow);
        console.log(this.data);
        return formatted ? cashFlow + "₽" : cashFlow;
    }

    getAverageMarginPercent(dateStart, dateEnd, formatted) {
        let sumOfMarginPercents = 0;
        let counter = 0;
        let averageMarginPercent = 0;

        this.data.map(selling => {
            if(moment(selling.date).format('x') >= moment(dateStart).format('x') && moment(selling.date).format('x') <= moment(dateEnd).format('x')) {
                sumOfMarginPercents += 100 * (selling.good.price / selling.good.purchasePrice);
                counter++;
            }
        });

        averageMarginPercent = Math.round((sumOfMarginPercents / this.data.length));
        return formatted ? averageMarginPercent + "%" : averageMarginPercent;
    }

    getConversion(dateStart, dateEnd, formatted) {
        console.log(this.metrik);
    }

    getGoodsExpenditures(dateStart, dateEnd, formatted) {
        let goodsExpenditures = 0;
        this.data.map(selling => {
            if(moment(selling.date).format('x') >= moment(dateStart).format('x') && moment(selling.date).format('x') <= moment(dateEnd).format('x')) {
                goodsExpenditures += selling.good.purchasePrice;
            }
        });

        return formatted ? goodsExpenditures + "₽" : goodsExpenditures;
    }

    getProfit(dateStart, dateEnd, formatted) {
        let result = this.getCashFlow(dateStart, dateEnd) / this.getGoodsExpenditures(dateStart, dateEnd);
        return formatted ? result + "₽" : result;
    }

    getAverageCheck(dateStart, dateEnd, formatted) {
        console.log(this.getCashFlow(dateStart, dateEnd));
        let averageCheck = Math.round((this.getCashFlow(dateStart, dateEnd) / this.getSumOfSales(dateStart, dateEnd)) * 100) / 100;
        return formatted ? averageCheck + "₽" : averageCheck;
    }
};