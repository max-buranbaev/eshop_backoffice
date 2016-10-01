import React from 'react';
import Good from './good.jsx';


class Goods extends React.Component {
    render() {
      return (
        <tbody>
          {
            this.props.goods.map( function(good) {
              return <Good good={ good } key={ good._id }/>
            })
          }
        </tbody>
      )
    }
};

export default Goods;
