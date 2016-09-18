import React from 'react'
import { connect } from "react-redux"
import { fetchGoods } from '../actions/goodsActions'
import { fetchCategories } from '../actions/categoryActions'
import store from '../store.js'

import TopPanel from './topPanel.jsx'
import Goods from './goods.jsx'
import Categories from './categories.jsx'
import RemoveModal from './removeModal.jsx'
import AddGoodModal from './addGoodModal.jsx'
import ChangeGoodModal from './changeGoodModal.jsx'
import AddCategoryModal from './addCategoryModal.jsx'

@connect( (store) => {
  return {
    goods: store.goods,
    categories: store.categories,
    addingVisible: store.addingGood.show,
    changingGood: store.changingGood,
    addCategoryVisible: store.addingCategory.show,
    removingModal: store.removingModal
  }
})

class Dashboard extends React.Component {

  componentWillMount() {
    store.dispatch(fetchGoods());
    store.dispatch(fetchCategories());
  }

  showAddGoodModal() {
      store.dispatch({type: "ADDING_GOOD_MODAL_SHOW"});
  }

  showAddCategoryModal() {
      store.dispatch({type: "ADDING_CATEGORY_MODAL_SHOW"});
  }

  render() {
    return (
      <div>
        <TopPanel />
        <div className="col-md-12">
          <div className="row" style={{ paddingTop: "20px" }}>
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
        <RemoveModal visible={ this.props.removingModal.show} id={ this.props.removingModal.id } type={this.props.removingModal.type} />
        <AddGoodModal visible={ this.props.addingVisible } categories={ this.props.categories } />
        <ChangeGoodModal visible={this.props.changingGood.show} good={this.props.changingGood.good} />
        <AddCategoryModal visible={this.props.addCategoryVisible } />
      </div>
    )
  }
}

export default Dashboard;
