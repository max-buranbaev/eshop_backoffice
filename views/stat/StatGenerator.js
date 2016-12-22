module.exports = class StatGenerator {

    constructor(data) {
        this.data = data;

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
    }

};