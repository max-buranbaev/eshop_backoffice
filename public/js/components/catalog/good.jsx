import React from 'react';
import { connect } from "react-redux"
import store from '../../store.js';

class Good extends React.Component {

    showSelling() {
      store.dispatch({ type: "SELLING_CHANGE_MODAL_STATE", visible: true, good: this.props.good });
    }

    render() {
      const { name, purchasePrice, price, siteId } = this.props.good;
      return (
        <tr>
          <td className="hidden-xs">{ siteId }</td>
          <td>{ name }</td>
          <td>{ purchasePrice }</td>
          <td>{ price }</td>
          <td>{ price - purchasePrice }</td>
          <td>
            <button onClick={ this.showSelling.bind(this) } className="btn btn-xs btn-success">продажа</button>
          </td>
        </tr>
      )
    }

};

export default Good;
