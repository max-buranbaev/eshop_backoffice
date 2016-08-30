module.exports = React.createClass({
    render: function() {
      return (
        <tbody>
          <tr>
            <th>ID</th>
            <th>Название</th>
            <th>Цена закупки</th>
            <th>Цена продажи</th>
            <th></th>
            <th></th>
          </tr>
          {
            this.props.goods.map( function(good) {
              return <Good _id={ good._id } name={ good.name } purchasePrice={ good.purchasePrice } price={ good.price } key={ good._id }/>
            })
          }
        </tbody>
      )
    }
});
