import React from "react"
import { removeGood } from '../actions/goodsActions'
import { addGood } from '../actions/goodsActions'
import store from '../store.js'

class AddGoodModal extends React.Component {

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

  handleChangeCategory(e) {
      this.setState({
          category: e.target.value
      })
  }

  handleSubmit(e) {
    e.preventDefault();
    e.target.reset();
    store.dispatch(addGood(this.state));
  }

  render() {
    return (
      <div className={ this.props.visible ? "visible modal fade in" : "modal fade in" } tabIndex="-1" role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" onClick={ this.close }><span aria-hidden="true">&times;</span></button>
              <h4 className="modal-title">Добавить товар.</h4>
            </div>
            <div className="modal-body">
              <form onSubmit={ this.handleSubmit.bind(this) }>
                <div className="form-group">
                  <label>Категория</label>
                    <select className="form-control" onChange={ this.handleChangeCategory.bind(this) }>
                      {
                        this.props.categories.map(function(cat) {
                          return <option key={ cat._id } value={ cat._id }> { cat.name } </option>
                        })
                      }
                    </select>
                </div>
                <div className="form-group">
                  <label>Название</label>
                  <input type="text" className="form-control" name="name" onChange={ this.handleChangeName.bind(this) } />
                </div>
                <div className="form-group">
                  <label>Закупочная стоимость</label>
                  <input type="text" className="form-control" name="purchasePrice" onChange={ this.handleChangePurchasePrice.bind(this) } />
                </div>
                <div className="form-group">
                  <label>Розничная цена</label>
                  <input type="text" className="form-control" name="price" onChange={ this.handleChangePrice.bind(this) } />
                </div>
                <button type="submit" className="btn btn-default">Добавить</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default AddGoodModal;
