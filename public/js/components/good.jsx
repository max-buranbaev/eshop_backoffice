import React from 'react';

class Good extends React.Component {

    handleClick() {
      store.dispatch({type: "ADD_NEW_GOODS", newGoods: []});
    }

    render() {
      return (
        <tr>
          <td>{this.props._id}</td>
          <td>{this.props.name}</td>
          <td>{this.props.purchasePrice}</td>
          <td>{this.props.price}</td>
          <td><button onClick={ this.handleClick } className="btn btn-xs"><span className="glyphicon glyphicon-pencil"></span></button></td>
          <td><button className="btn btn-xs"><span className="glyphicon glyphicon-remove"></span></button></td>
        </tr>
      )
    }

};

export default Good;
