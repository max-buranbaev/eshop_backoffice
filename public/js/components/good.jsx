import React from 'react';
import { connect } from "react-redux"
import store from '../store.js';

class Good extends React.Component {

    handleClickRemove() {
      store.dispatch({ type: "REMOVING_MODAL_SHOW", id: this.props.good._id });
    }

    handleClickEdit() {
      console.log(this.state);
      store.dispatch({ type: "CHANGING_GOOD_MODAL_SHOW", good:  this.props.good});
    }

    render() {
      return (
        <tr>
          <td>{this.props.good._id}</td>
          <td>{this.props.good.name}</td>
          <td>{this.props.good.purchasePrice}</td>
          <td>{this.props.good.price}</td>
          <td><button onClick={ this.handleClickEdit.bind(this) } className="btn btn-xs"><span className="glyphicon glyphicon-pencil"></span></button></td>
          <td><button onClick={ this.handleClickRemove.bind(this) } className="btn btn-xs"><span className="glyphicon glyphicon-remove"></span></button></td>
        </tr>
      )
    }

};

export default Good;
