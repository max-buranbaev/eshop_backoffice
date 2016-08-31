import React from 'react'
import { connect } from "react-redux"
import { fetchGoods } from '../actions/goodsActions'
import store from '../store.js'

import Goods from './goods.jsx'
import RemoveModal from './removeModal.jsx'

@connect( (store) => {
  return {
    goods: store.goods,
    removingVisible: store.removingGood.show,
    removingID: store.removingGood.id
  }
})

class Dashboard extends React.Component {

  componentWillMount() {
    store.dispatch(fetchGoods());
  }

  render() {
    return (
      <div>
        <div className="col-md-2">
          <ul className="nav nav-stacked">
            <li role="presentation" className="active"><a href="#">Категория 1</a></li>
            <li role="presentation"><a href="#">Категория 2</a></li>
            <li role="presentation"><a href="#">Категория 3</a></li>
            <li role="presentation"><a href="#">Без категории</a></li>
          </ul>
        </div>
        <div className="col-md-10">
          <div className="row">
            <button type="button" className="btn btn-default btn-lg">
              <span className="glyphicon glyphicon-plus" aria-hidden="true"></span>
              <span>Добавить категорию</span>
            </button>
            <button type="button" className="btn btn-default btn-lg">
              <span className="glyphicon glyphicon-plus" aria-hidden="true"></span>
              <span>Добавить товар</span>
            </button>
          </div>
          <div className="row" style={{ paddingTop: "20px" }}>
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Название</th>
                  <th>Цена закупки</th>
                  <th>Цена продажи</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <Goods goods={ this.props.goods} />
            </table>
          </div>
        </div>
        <RemoveModal visible={ this.props.removingVisible } id={ this.props.removingID } />
      </div>
    )
  }
}

export default Dashboard;
