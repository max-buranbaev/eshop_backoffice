var Dashboard = React.createClass({
  render: function() {
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
          <div className="row" style={{paddingTop: "20px"}}>
            <table className="table table-hover">
              <Goods goods={ this.props.goods }/>
            </table>
          </div>
        </div>
      </div>
    )
  }
});

var Goods = React.createClass({
    render: function() {
      console.log(this.props.goods);
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

var Good = React.createClass({
    render: function() {
      return (
        <tr>
          <td>{this.props._id}</td>
          <td>{this.props.name}</td>
          <td>{this.props.purchasePrice}</td>
          <td>{this.props.price}</td>
          <td><button className="btn btn-xs"><span className="glyphicon glyphicon-pencil"></span></button></td>
          <td><button className="btn btn-xs"><span className="glyphicon glyphicon-remove"></span></button></td>
        </tr>
      )
    }
});

var DashboardReducer = function(state, action) {
    var newState = {};

    if(_.isUndefined(state)) {
      return { goods: [] }
    } else {
      switch (action.type) {
        case "ADD_NEW_GOODS":
          console.log(action.newGoods);
          newState = Object.assign({}, { goods: action.newGoods});
          return newState;
          break;
        default:
          return state;
      }
    }

}

var createStore = Redux.createStore;
var store = createStore(DashboardReducer);

// Render
var render = function() {
  var ds = store.getState();
  console.log(ds);
  ReactDOM.render(
    <Dashboard goods={ ds.goods } />,
    document.getElementById("dashboard")
  );
};

// For first rendering
render();

// TODO: WTF ? It's a wrong way, bro!
$.get( "/goods", function( data ) {
  store.dispatch({type: "ADD_NEW_GOODS", newGoods: data});
});
// Rerendering on changing store
store.subscribe(render);
