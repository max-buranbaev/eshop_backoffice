import React from 'react'
import store from '../../store.js'
import moment from 'moment'

import { connect } from 'react-redux'
import { create } from '../../actions/expenditures'


class AddExpenditureModal extends React.Component {

    close() {
        store.dispatch({ type: "EXPENDITURE_CHANGE_MODAL_STATE", visible: false })
    }

    handleSubmit(e) {
        e.preventDefault();
        let newItem = this.state;
        newItem.date = moment(newItem.date, "DD.MM.YYYY").format();
        store.dispatch(create(newItem));
        this.close();
    }

    handleChange(e) {
        let { name, value } = e.target;
        this.setState({ [name]: value });
    }

    render() {
        return (
            <div className={ this.props.visible ? "visible modal fade in" : "modal fade in" } tabIndex="-1" role="dialog">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" onClick={ this.close.bind(this) }><span aria-hidden="true">&times;</span></button>
                            <h4 className="modal-title">Добавить расход</h4>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={ this.handleSubmit.bind(this) }>
                                <div className="form-group">
                                    <label>Описание</label>
                                    <input type="text" name="description" onChange={ this.handleChange.bind(this) } className="form-control"/>
                                </div>
                                <div className="form-group">
                                    <label>Дата в формате 01.02.2016</label>
                                    <input type="text" name="date" className="form-control" onChange={ this.handleChange.bind(this) } required />
                                </div>
                                <div className="form-group">
                                    <label>Колличество в рублях</label>
                                    <input type="text" name="amount" className="form-control" onChange={ this.handleChange.bind(this) } required />
                                </div>
                                <div className="form-group">
                                    <label>Тип</label>
                                    <select name="type" className="form-control" onChange={ this.handleChange.bind(this) }>
                                        <option value="1">Реклама</option>
                                        <option value="2">Офис</option>
                                        <option value="3">Прочее</option>
                                    </select>
                                </div>
                                <button type="submit" className="btn btn-success">Добавить</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

var getProps = function(state) {
    return {
        visible: state.expenditures.modal.visible
    }
};



export default connect(getProps)(AddExpenditureModal);
