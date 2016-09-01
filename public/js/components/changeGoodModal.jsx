import React from "react"
import { removeGood } from '../actions/goodsActions'
import { changeGood } from '../actions/goodsActions'
import { connect } from "react-redux"
import store from '../store.js'

class ChangeGoodModal extends React.Component {

  close() {
      store.dispatch({ type: "CHANGING_GOOD_MODAL_CLOSE" })
  }

  handleChange(e) {
      store.dispatch({ type: "CHANGE_GOOD_FIELD", name: e.target.getAttribute('name'), value: e.target.value })
  }

  handleSubmit(e) {
    e.preventDefault();
    e.target.reset();
    store.dispatch(changeGood(store));
  }

  render() {
    return (
      <div className={ this.props.visible ? "visible modal fade in" : "modal fade in" } tabIndex="-1" role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" onClick={ this.close }><span aria-hidden="true">&times;</span></button>
              <h4 className="modal-title">Изменить товар. {this.props.good._id}</h4>
            </div>
            <div className="modal-body">
              <form onSubmit={ this.handleSubmit.bind(this) }>
                <div className="form-group">
                  <label>Название</label>
                  <input type="text" className="form-control" name="name" onChange={ this.handleChange.bind(this) } placeholder={ this.props.good.name }/>
                </div>
                <div className="form-group">
                  <label>Закупочная стоимость</label>
                  <input type="text" className="form-control" name="purchasePrice" onChange={ this.handleChange.bind(this) } placeholder={ this.props.good.purchasePrice }/>
                </div>
                <div className="form-group">
                  <label>Розничная цена</label>
                  <input type="text" className="form-control" name="price" onChange={ this.handleChange.bind(this) } placeholder={ this.props.good.price }/>
                </div>
                <button type="submit" className="btn btn-default">Изменить</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ChangeGoodModal;
