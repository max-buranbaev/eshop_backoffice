import React from 'react'
import moment from 'moment'
import store from '../../store'
import { getSource } from '../../constants'
import { deleteSelling } from '../../actions/sales'

var Selling = React.createClass({
    handleRemove: function() {
        store.dispatch(deleteSelling(this.props.selling._id));
    },

    render: function() {
        return (
            <tr>
                <td>{ this.props.selling.good.name }</td>
                <td>{ moment(this.props.selling.date).format("DD.MM.YYYY") }</td>
                <td>{ getSource(this.props.selling.source) }</td>
                <td>{ this.props.selling.phone }</td>
                <td><button className="btn btn-danger btn-xs" onClick={ this.handleRemove }>удалить</button></td>
            </tr>
        )
    }
});

export default Selling
