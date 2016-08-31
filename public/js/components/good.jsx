import React from 'react';
import { connect } from "react-redux"
import store from '../store.js';

class Good extends React.Component {

    handleClickRemove() {
      store.dispatch({ type: "REMOVING_MODAL_SHOW", id: this.props._id });
    }

    handleClickEdit() {
      console.log(this.state);
      store.dispatch({ type: "CHANGING_GOOD_MODAL_SHOW", id: this.props._id, name: this.props.name, purchasePrice: this.props.purchasePrice, price: this.props.price });
    }

    render() {
      return (
        <tr>
          <td>{this.props._id}</td>
          <td>{this.props.name}</td>
          <td>{this.props.purchasePrice}</td>
          <td>{this.props.price}</td>
          <td><button onClick={ this.handleClickEdit.bind(this) } className="btn btn-xs"><span className="glyphicon glyphicon-pencil"></span></button></td>
          <td><button onClick={ this.handleClickRemove.bind(this) } className="btn btn-xs"><span className="glyphicon glyphicon-remove"></span></button></td>
        </tr>
      )
    }

};

export default Good;
