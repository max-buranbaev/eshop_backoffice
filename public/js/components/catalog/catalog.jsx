import React from 'react'
import AddSellingModal from '../modals/addSellingModal.jsx'
import Goods from './goods.jsx'
import store from '../../store.js'
import { connect } from 'react-redux'

var Catalog = React.createClass({
    render: function() {
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
                            <span className="hidden-xs hidden-sm">Покупка</span>
                            <span className="hidden-md hidden-lg">Пок</span>
                          </th>
                          <th>
                            <span className="hidden-xs hidden-sm">Продажа</span>
                            <span className="hidden-md hidden-lg">Про</span>
                          </th>
                          <th>
                            <span className="hidden-xs hidden-sm">Маржа</span>
                            <span className="hidden-md hidden-lg">Мар</span>
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
})

var getProps = function(store) {
    return {
        goods: store.goods.filteredGoods
    }
}

export default connect(getProps)(Catalog)
