import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchSales } from '../../actions/sales'
import store from '../../store'
import moment from 'moment'

class Statistics extends Component {
    componentWillMount() {
        store.dispatch(fetchSales());
    }

    render() {
        const { sales } = this.props;
        console.log(sales );
        const rows = [];
        for(let month in sales) {
            rows.push(
                <tr key={ month }>
                    <td>{ month }</td>
                    <td>{ sales[month].cashflow }</td>
                    <td>{ sales[month].profit }</td>
                    <td></td>
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
    const months = {};
    store.sales.sales.map( (sale) => {
        let month = moment(sale.date).month();
        let year = moment(sale.date).year();
        let key = month + '/' + year;
        if(!months[key]) {
            months[key] = {
                cashflow: sale.good.purchasePrice,
                profit: (sale.good.price - sale.good.purchasePrice)
            };
        } else {
            months[key].cashflow += sale.good.purchasePrice;
            months[key].profit += (sale.good.price - sale.good.purchasePrice);
        }
    })

    return {
        sales: months
    }

}

export default connect(getProps)(Statistics)
