import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchSales } from '../../actions/sales'
import { read } from '../../actions/expenditures'
import store from '../../store'
import moment from 'moment'

class Statistics extends Component {
    componentWillMount() {
        store.dispatch(fetchSales());
        store.dispatch(read());
    }

    render() {
        const { sales } = this.props;
        console.log(sales );
        const rows = [];
        for(let month in sales) {
            let netProfit = sales[month].profit - sales[month].expenditures;
            rows.push(
                <tr key={ month }>
                    <td><b>{ sales[month].monthTranslated }</b></td>
                    <td>{ sales[month].cashflow } ₽</td>
                    <td>{ sales[month].profit } ₽</td>
                    <td>{ netProfit }</td>
                </tr>
            )

        }
        return (
            <div className="col-md-12">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <td>Месяц</td>
                            <td>Оборот</td>
                            <td>Прибыль</td>
                            <td>Чистая прибыль</td>
                        </tr>
                    </thead>
                    <tbody>
                        { rows }
                    </tbody>
                </table>
            </div>
        )
    }
}

const getProps = (store) => {
    var expenditureMonths = {};
    store.expenditures.list.map((expenditure) => {
        let { date, amount } = expenditure;
        let key = moment(date).format("MMMM");
        if(!expenditureMonths[key]) {
            expenditureMonths[key] = amount;
        } else {
            expenditureMonths[key] += amount;
        }
    });

    var months = {};
    store.sales.sales.map( (sale) => {
        let key = moment(sale.date).format("MMMM");
        if(!months[key]) {
            months[key] = {
                monthTranslated: moment(sale.date).locale('ru').format("MMMM"),
                cashflow: sale.good.price,
                profit: (sale.good.price - sale.good.purchasePrice),
                expenditures: expenditureMonths[key]
            };
        } else {
            months[key].cashflow += sale.good.price;
            months[key].profit += (sale.good.price - sale.good.purchasePrice);
        }
    });


    return {
        sales: months
    }

};

export default connect(getProps)(Statistics)
