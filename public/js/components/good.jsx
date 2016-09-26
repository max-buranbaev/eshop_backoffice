import React from 'react';
import { connect } from "react-redux"
import store from '../store.js';

class Good extends React.Component {

    showSelling() {
      store.dispatch({ type: "SELLING_CHANGE_MODAL_STATE", visible: true, good: this.props.good });
    }

    render() {
      return (
        <tr>
          <td className="hidden-xs">{ this.props.good.siteId }</td>
          <td>{ this.props.good.name }</td>
          <td>{ this.props.good.purchasePrice }</td>
          <td>{ this.props.good.price }</td>
          <td>
            <button onClick={ this.showSelling.bind(this) } className="btn btn-xs btn-success">продажа</button>
          </td>
        </tr>
      )
    }

};

export default Good;
