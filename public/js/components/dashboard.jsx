import React from 'react'
import { connect } from "react-redux"
import { fetchGoods } from '../actions/goodsActions'
import store from '../store.js'

import TopPanel from './topPanel.jsx'
import Goods from './goods.jsx'

import AddGoodModal from './addGoodModal.jsx'

@connect( (store) => {
  return {
    goods: store.filteredGoods
  }
})

class Dashboard extends React.Component {

  componentWillMount() {
    store.dispatch(fetchGoods());
  }

  render() {
    return (
      <div>
        <TopPanel />
        <div className="col-md-12">
          <div className="row">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Название</th>
                  <th>Покупка</th>
                  <th>Продажа</th>
                  <th></th>
                </tr>
              </thead>
              <Goods goods={ this.props.goods} />
            </table>
          </div>
        </div>
      </div>
    )
  }
}

export default Dashboard;
