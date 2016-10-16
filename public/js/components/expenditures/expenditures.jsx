import React from 'react'
import AddExpenditureModal from '../modals/addExpenditureModal.jsx'
import ExpenditureRow from './expenditureRow.jsx'
import store from '../../store'
import { connect } from 'react-redux'
import { read } from '../../actions/expenditures'

class Expenditures extends React.Component {
    componentWillMount() {
        store.dispatch(read());
    }

    handleAdd() {
        store.dispatch({ type: "EXPENDITURE_CHANGE_MODAL_STATE", visible: true });
    }

    render() {
        var rows = [];
        if(this.props.list.length > 0) {
            console.log(this.props.list);
            this.props.list.map( (item) => {
                console.log(item);
                rows.push(<ExpenditureRow key={ item._id } item={ item }/>);
            });
        }

        return (
            <div>
                <div className="row">
                    <div className="col-md-12">
                        <button className="btn btn-default" onClick={ this.handleAdd }>Добавить расход</button>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>Описание</th>
                                    <th>Дата</th>
                                    <th>Колличество</th>
                                    <th>Тип</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                            { rows }
                            </tbody>
                        </table>
                    </div>
                </div>
                <AddExpenditureModal />
            </div>
        )
    }
}

const getProps = function(state) {
    return {
        list: state.expenditures.list
    }
};

export default connect(getProps)(Expenditures)