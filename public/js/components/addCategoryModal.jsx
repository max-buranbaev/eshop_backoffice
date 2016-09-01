import React from "react"
import store from '../store.js'
import { addCategory } from '../actions/categoryActions.js';

class AddCategoryModal extends React.Component {

  close() {
      store.dispatch({ type: "ADDING_CATEGORY_MODAL_CLOSE" })
  }

  handleChangeName(e) {
      this.setState({
          name: e.target.value
      });
  }

  handleSubmit(e) {
    e.preventDefault();
    e.target.reset();
    store.dispatch(addCategory(this.state.name));
  }

  render() {
    return (
      <div className={ this.props.visible ? "visible modal fade in" : "modal fade in" } tabIndex="-1" role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" onClick={ this.close }><span aria-hidden="true">&times;</span></button>
              <h4 className="modal-title">Добавить Категорию.</h4>
            </div>
            <div className="modal-body">
              <form onSubmit={ this.handleSubmit.bind(this) }>
                <div className="form-group">
                  <label>Название</label>
                  <input type="text" className="form-control" name="name" onChange={ this.handleChangeName.bind(this) } />
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

export default AddCategoryModal;
