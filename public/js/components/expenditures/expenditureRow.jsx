import React from 'react'
import moment from 'moment'
import store from '../../store'
import { getType } from '../../constants'
import { deleteItem } from '../../actions/expenditures'


class ExpenditureRow extends React.Component {
    handleDelete() {
        store.dispatch(deleteItem(this.props.item._id));
    }

    render() {
        const { description, amount, date, type } = this.props.item;
        return (
            <tr>
                <td> { description } </td>
                <td> { moment(date).locale('ru').format("DD MMMM YYYY") } </td>
                <td> { amount } ₽ </td>
                <td> { getType(type) } </td>
                <td>
                    <button className="btn btn-danger btn-sm" onClick={ this.handleDelete.bind(this) }>удалить</button>
                </td>
            </tr>
        )
    }
}

export default ExpenditureRow
