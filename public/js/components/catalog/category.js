import React from 'react'
import store from '../store.js'

class Category extends React.Component {
    handleClickRemove() {
      store.dispatch({ type: "REMOVING_MODAL_SHOW", id: this.props.id , removeType: "category" });
    }

    render() {
      return (
        <li style={{ marginBottom: "20px" }}>
          <button className="btn btn-xs" onClick={ this.handleClickRemove.bind(this) } style={{ marginRight: "20px"}}>
            <span className="glyphicon glyphicon-remove"></span>
          </button>
          <a href="#">{ this.props.name }</a>
        </li>
      )
    }
}

export default Category;
