import React from 'react';
import Good from './good.jsx';


class Goods extends React.Component {
    render() {
      return (
        <div>
          {
            this.props.goods.map( function(good) {
              return <Good _id={ good._id } name={ good.name } purchasePrice={ good.purchasePrice } price={ good.price } key={ good._id }/>
            })
          }
        </div>
      )
    }
};

export default Good;
