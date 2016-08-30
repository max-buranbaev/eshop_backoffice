var Dashboard = require("./components/dashboard.js");
var Goods = require("./components/goods.js");
var Good = require("./components/good.js");

var DashboardReducer = function(state, action) {
    var newState = {};
    switch (action.type) {
      case "ADD_NEW_GOODS":
        newState = Object.assign({}, { goods: action.newGoods});
        return newState;
        break;
      default:
        return state;
    }
}

function logger({ getState }) {
  return (next) => (action) => {
    console.log('will dispatch', action)

    // Call the next dispatch method in the middleware chain.
    let returnValue = next(action)

    console.log('state after dispatch', getState())

    // This will likely be the action itself, unless
    // a middleware further in chain changed it.
    return returnValue
  }
}

var middleware = Redux.applyMiddleware(logger);
var createStore = Redux.createStore;
var store = createStore(DashboardReducer, { goods: [] }, middleware);

// Render
var render = function() {
  var ds = store.getState();
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
