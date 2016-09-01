import React from "react"
import { removeGood } from '../actions/goodsActions'
import { removeCategory } from '../actions/categoryActions'
import store from '../store.js'

class RemoveModal extends React.Component {

  handleClickRemove() {
    if(this.props.type == "good") store.dispatch(removeGood(this.props.id));
    if(this.props.type == "category") store.dispatch(removeCategory(this.props.id));
  }

  close() {
      store.dispatch({ type: "REMOVING_MODAL_CLOSE" })
  }

  render() {
    return (
      <div className={ this.props.visible ? "visible modal fade in" : "modal fade in" } tabIndex="-1" role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" onClick={ this.close }><span aria-hidden="true">&times;</span></button>
              <h4 className="modal-title">Внимание!</h4>
            </div>
            <div className="modal-body">
              <p>Вы точно хотите удалить { this.props.type == "good" ? "товар" : "категорию" }?</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-default" onClick={ this.close } >Отменить</button>
              <button type="button" className="btn btn-primary" onClick={ this.handleClickRemove.bind(this) }>Удалить</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default RemoveModal;
