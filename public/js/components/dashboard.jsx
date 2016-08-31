import React from 'react';
import Goods from './goods.jsx';

class Dashboard extends React.Component {
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
              <tbody>
                <Goods goods={ this.props.goods }/>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }
}

export default Dashboard;
