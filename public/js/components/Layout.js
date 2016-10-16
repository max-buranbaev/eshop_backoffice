import React from 'react'
import TopPanel from './navbar/topPanel.jsx'
import store from '../store.js'

import { fetchGoods } from '../actions/goods'

var Layout = React.createClass({

    componentDidMount: function() {
        store.dispatch(fetchGoods());
    },

    render: function() {
        return (
            <div>
                <TopPanel />
                <div className="container-fluid">
                    { this.props.children }
                </div>

            </div>
        )
    }
});

export default Layout;
