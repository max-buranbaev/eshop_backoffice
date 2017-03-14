import React from 'react'
import { connect } from 'react-redux'

class CategoriesTable extends React.Component {
  constructor(props) {
    super(props)
    this.getData = this.getData.bind(this);
    this.getContent = this.getContent.bind(this);
  }

  getData() {
      const { goods } = this.props;
      const helper = (result, good) => {
        return Object.assign({}, result, {
          [good.category]: {
            id: good.category,
            count: result.hasOwnProperty(good.category) ? result[good.category].count + 1 : 1,
            price: result.hasOwnProperty(good.category) ? (result[good.category].price + good.price) : good.price,
            purchasePrice: result.hasOwnProperty(good.category) ? (result[good.category].purchasePrice + good.purchasePrice) : good.purchasePrice,
          }});
      }
      return goods.reduce(helper, {});
  }

  getContent() {
    const data = this.getData();
    const { categories } = this.props;
    let rows = [];
    for(let key in data) {
      rows.push(
        <tr key={data[key]["id"]}>
          <td>{data[key]["id"]}</td>
          <td>{categories.find(el => el.siteId == parseInt(key))["name"]}</td>
          <td>{data[key]["count"]}</td>
          <td>{Math.round(data[key]["purchasePrice"])}</td>
          <td>{data[key]["price"]}</td>
          <td>{Math.round((data[key]["price"] - data[key]["purchasePrice"]) / data[key]["count"])}</td>
        </tr>
      )
    }
    return rows;
  }
  render() {
    return (
      <div className="row">
          <div className="col-md-12">
            <div className="row">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th className="hidden-xs">ID</th>
                    <th>Название</th>
                    <th>
                      <span className="hidden-xs hidden-sm">Колличество</span>
                      <span className="hidden-md hidden-lg">Кол</span>
                    </th>
                    <th>
                      <span className="hidden-xs hidden-sm">Покупка</span>
                      <span className="hidden-md hidden-lg">Пок.</span>
                    </th>
                    <th>
                      <span className="hidden-xs hidden-sm">Продажа</span>
                      <span className="hidden-md hidden-lg">Прод</span>
                    </th>
                    <th>
                      <span className="hidden-xs hidden-sm">Маржа</span>
                      <span className="hidden-md hidden-lg">Мар</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  { this.getContent() }
                </tbody>
              </table>
            </div>
          </div>
      </div>
    )
  }
}

const setStateToProps = (state) => ({
  goods: state.goods.goods,
  categories: state.categories.categories
})

export default connect(setStateToProps)(CategoriesTable);
