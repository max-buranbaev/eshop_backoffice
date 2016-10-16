import React from 'react'
import store from '../../store.js'
import moment from 'moment'

import { addSelling } from '../../actions/sales'
import { connect } from 'react-redux'



class AddSellingModal extends React.Component {

  close() {
      store.dispatch({ type: "SELLING_CHANGE_MODAL_STATE", visible: false, good: {} })
  }

  handleSubmit(e) {
    e.preventDefault();

    var selling = {
      id: this.props.good._id,
      phone: this.refs.phone.value,
      source: this.refs.source.value,
      date: moment(this.refs.date.value, "DD.MM.YYYY")
    }

    store.dispatch(addSelling(selling));
  }

  render() {
    return (
      <div className={ this.props.visible ? "visible modal fade in" : "modal fade in" } tabIndex="-1" role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" onClick={ this.close.bind(this) }><span aria-hidden="true">&times;</span></button>
              <h4 className="modal-title">Продажа</h4>
            </div>
            <div className="modal-body">
              <form onSubmit={ this.handleSubmit.bind(this) }>
                <div className="form-group">
                  <p className="help-block" style={{ "fontSize": "11px" }}>
                    Товар: { this.props.good.name }<br/>
                    Цена: { this.props.good.price } ₽
                  </p>
                  <label>Телефон</label>
                  <input type="text" className="form-control" ref="phone"/>
                </div>
                <div className="form-group">
                    <label>Дата в формате 01.02.2016</label>
                    <input type="text" className="form-control" ref="date" required />
                </div>
                <div className="form-group">
                  <label>Источник</label>
                  <select ref="source" className="form-control">
                    <option value="1">Интернет</option>
                    <option value="2">Больница</option>
                    <option value="3">Газета</option>
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
    good: state.sales.selling.good,
    visible: state.sales.selling.visible
  }
}



export default connect(getProps)(AddSellingModal);
