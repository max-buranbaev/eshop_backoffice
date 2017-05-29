import React from 'react'
import Sales from './sales.jsx'
import store from '../../store.js'
import { fetchSales } from '../../actions/sales.js'
import { connect } from 'react-redux'

var SalesTable = React.createClass({

    componentWillMount: function() {
        console.log("DISPATCHING...");
        store.dispatch(fetchSales());
    },

    render: function() {
        return (
            <div>
                <div className="col-md-12">
                    <div className="row">
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th>Товар</th>
                                    <th>Стоимость Продажи</th>
                                    <th>Закупочная цена</th>
                                    <th>Маржа</th>
                                    <th>Дата</th>
                                    <th>Источник</th>
                                    <th>Телефон</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <Sales sales={ this.props.sales } />
                        </table>
                    </div>
                </div>
            </div>
        )
    }
})

var getProps = function(store) {
    return {
        sales: store.sales.sales
    }
}

export default connect(getProps)(SalesTable)
