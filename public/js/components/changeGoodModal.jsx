import React from "react"
import { removeGood } from '../actions/goodsActions'
import { changeGood } from '../actions/goodsActions'
import store from '../store.js'

class ChangeGoodModal extends React.Component {
  setInitialState() {
      return {
        id: this.props.id,
        name: this.props.name,
        purchasePrice: this.props.purchasePrice,
        price: this.props.price
      }
  }

  close() {
      store.dispatch({ type: "ADDING_GOOD_MODAL_CLOSE" })
  }

  handleChangeName(e) {
      this.setState({
          name: e.target.value
      });
  }

  handleChangePurchasePrice(e) {
      this.setState({
          purchasePrice: e.target.value
      });
  }

  handleChangePrice(e) {
      this.setState({
          price: e.target.value
      });
  }

  handleSubmit(e) {
    e.preventDefault();
    e.target.reset();
    store.dispatch(changeGood(this.state));
  }

  render() {
    return (
      <div className={ this.props.visible ? "visible modal fade in" : "modal fade in" } tabIndex="-1" role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" onClick={ this.close }><span aria-hidden="true">&times;</span></button>
              <h4 className="modal-title">Изменить товар.</h4>
            </div>
            <div className="modal-body">
              <form onSubmit={ this.handleSubmit.bind(this) }>
                <div className="form-group">
                  <label>Название</label>
                  <input type="text" className="form-control" name="name" onChange={ this.handleChangeName.bind(this) } placeholder={ this.props.name }/>
                </div>
                <div className="form-group">
                  <label>Закупочная стоимость</label>
                  <input type="text" className="form-control" name="purchasePrice" onChange={ this.handleChangePurchasePrice.bind(this) } placeholder={ this.props.purchasePrice }/>
                </div>
                <div className="form-group">
                  <label>Розничная цена</label>
                  <input type="text" className="form-control" name="price" onChange={ this.handleChangePrice.bind(this) } placeholder={ this.props.price }/>
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
