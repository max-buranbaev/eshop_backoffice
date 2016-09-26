import React from 'react'
import { connect } from "react-redux"
import { fetchGoods } from '../actions/goodsActions'
import store from '../store.js'

import TopPanel from './topPanel.jsx'
import Goods from './goods.jsx'

import AddSellingModal from './addSellingModal.jsx'

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
                  <th className="hidden-xs">ID</th>
                  <th>Название</th>
                  <th>
                    <span className="hidden-xs hidden-sm">Покупка</span>
                    <span className="hidden-md hidden-lg">Пок</span>
                  </th>
                  <th>
                    <span className="hidden-xs hidden-sm">Продажа</span>
                    <span className="hidden-md hidden-lg">Про</span>
                  </th>
                  <th></th>
                </tr>
              </thead>
              <Goods goods={ this.props.goods} />
            </table>
          </div>
        </div>
        <AddSellingModal />
      </div>
    )
  }
}

export default Dashboard;
