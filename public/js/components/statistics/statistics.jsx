import React, {Component} from 'react'
import {connect} from 'react-redux'
import {createCustomReport} from '../../actions/stat'
import store from '../../store'
import moment from 'moment'
import Chart from './chart.jsx'

class Statistics extends Component {
    constructor(props) {
        super(props);
        this.state = {
            from: moment().month(-1).format("DD.MM.YYYY"),
            to: moment().format("DD.MM.YYYY")
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleCreateReport = this.handleCreateReport.bind(this);
        this.getCustomReport = this.getCustomReport.bind(this);
    }

    handleChange(ev) {
        this.setState({
            [ev.target.name]: ev.target.value
        });
    }

    handleCreateReport(ev) {
        ev.preventDefault();
        store.dispatch(createCustomReport(this.state.from, this.state.to));
    }

    getCustomReport() {
        const {stat} = this.props.stat.customReport;
        return (
            <div className="row" style={{"marginTop": "40px"}}>
                <div className="col-md-12">
                    <table className="table">
                        <tbody>
                        <tr>
                            <th>Оборот</th>
                            <th>Закупка Товара</th>
                            <th>Прибыль</th>
                            <th>Средний чек</th>
                            <th>Средняя наценка</th>
                            <th>Кол. Продаж</th>
                            <th>Конверсия</th>
                        </tr>
                        <tr>
                            <td>{stat.cashFlow.y} ₽</td>
                            <td>{stat.goodsExpenditures.y} ₽</td>
                            <td>{stat.profit.y} ₽</td>
                            <td>{stat.averageCheck.y} ₽</td>
                            <td>{stat.averageMarginPercent.y} %</td>
                            <td>{stat.sumOfSales.y} </td>
                            <td>{stat.conversion.y} %</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>

        )
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <form className="form-inline" onSubmit={this.handleCreateReport}>
                            <div className="form-group">
                                <label htmlFor="from">От</label>
                                <input onChange={this.handleChange}
                                       type="text" name="from"
                                       className="form-control"
                                       id="from"
                                       placeholder="01.10.2016"
                                       defaultValue={this.state.from}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="to">До</label>
                                <input onChange={this.handleChange}
                                       type="text" name="to"
                                       className="form-control"
                                       id="to"
                                       defaultValue={this.state.to}/>
                            </div>
                            <button type="submit" className="btn btn-default">Сформировать</button>
                        </form>
                    </div>
                </div>
                { this.props.stat.customReport ? this.getCustomReport() : "" }
                <div className="row">
                    <Chart />
                </div>
            </div>
        )
    }
}

const getProps = state => {
    return {
        stat: state.stat
    }
};

export default connect(getProps)(Statistics);
