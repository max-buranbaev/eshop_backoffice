import ReactHighcharts from 'react-highcharts'
import React from 'react'
import {createWeeklyReport} from '../../actions/stat'
import store from '../../store'
import {connect} from 'react-redux'

class Chart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            configFinance: null,
            configConversion: null
        };

        this.getCharts = this.getCharts.bind(this);
    }

    componentWillMount() {
        store.dispatch(createWeeklyReport());
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.weeklyReport) {
            this.setState({
                configFinance: {
                    title: {
                        text: 'Финансы'
                    },
                    xAxis: {
                        tickInterval: 7 * 24 * 3600 * 1000, // one week
                        tickWidth: 0,
                        gridLineWidth: 1,
                        labels: {
                            align: 'left',
                            x: 3,
                            y: -3
                        }
                    },
                    series: [{
                        name: "Оборот",
                        data: nextProps.weeklyReport.cashFlow
                    },
                    {
                        name: "Прибыль",
                        data: nextProps.weeklyReport.profit
                    }]
                },
                configConversion: {
                    title: {
                        text: 'Конверсия'
                    },
                    xAxis: {
                        tickInterval: 7 * 24 * 3600 * 1000, // one week
                        tickWidth: 0,
                        gridLineWidth: 1,
                        labels: {
                            align: 'left',
                            x: 3,
                            y: -3
                        }
                    },
                    series: [{
                        name: "Конверсия",
                        data: nextProps.weeklyReport.conversion
                    }]
                }
            });
        }
    }

    getCharts() {
        return (
            <div>
                <div className="row">
                    <div className="col-md-12">
                        <ReactHighcharts config={this.state.configFinance}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <ReactHighcharts config={this.state.configConversion}/>
                    </div>
                </div>
            </div>
        )
    }
    render() {
        return this.state.configFinance ? this.getCharts() : <p>Loading</p>;
    }

}
const getParams = state => {
    return {
        weeklyReport: state.stat.weeklyReport
    }
};

export default connect(getParams)(Chart)