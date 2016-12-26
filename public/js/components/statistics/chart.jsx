import ReactHighcharts from 'react-highcharts'
import React from 'react'
import {createWeeklyReport} from '../../actions/stat'
import store from '../../store'
import {connect} from 'react-redux'

class Chart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            config: null
        }
    }

    componentWillMount() {
        store.dispatch(createWeeklyReport());
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps.weeklyReport[4]);
        if (nextProps.weeklyReport) {
            this.setState({
                config: {
                    title: {
                        text: 'Fruit Consumption'
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
                        data: nextProps.weeklyReport[4]["data"]
                    }]
                }
            });
        }
    }

    render() {
        return this.state.config ? <ReactHighcharts config={this.state.config}/> : <p>Loading</p>;
    }

}
const getParams = state => {
    return {
        weeklyReport: state.stat.weeklyReport
    }
};

export default connect(getParams)(Chart)