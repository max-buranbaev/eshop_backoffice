import React from 'react';
import Selling from './selling.jsx';


class Sales extends React.Component {
    render() {
      return (
        <tbody>
          {
            this.props.sales.map( function(selling) {
              return <Selling selling={ selling } key={ selling._id }/>
            })
          }
      </tbody>
      )
    }
};

export default Sales;
