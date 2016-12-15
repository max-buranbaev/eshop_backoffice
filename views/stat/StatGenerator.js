module.exports = class StatGenerator {

    constructor(data) {
        this.data = data;
    }

    getAverageCheck() {
        let sumOfSellings = null;
        this.data.map((selling) => sumOfSellings += selling.good.price);
        return sumOfSellings / this.data.length;
    }

    getAverageMarginPercent() {
        let sumOfMarginPercents = null;
        this.data.map((selling) => {
            sumOfMarginPercents += 100 * (selling.good.price / selling.good.purchasePrice);
        });
        return sumOfMarginPercents / this.data.length;
    }
};