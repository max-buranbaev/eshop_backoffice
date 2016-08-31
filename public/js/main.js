import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import Dashboard from './components/dashboard.jsx';


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

var store = createStore(DashboardReducer, { goods: [] });

// Render
var render = function() {
  var ds = store.getState();
  ReactDOM.render(
    <Dashboard goods={ ds.goods }/>,
    document.getElementById("dashboard")
  );
};

store.subscribe(render);

// For first rendering
render();

// TODO: WTF ? It's a wrong way, bro!


$.get( "/goods", function( data ) {
  store.dispatch({type: "ADD_NEW_GOODS", newGoods: data});
});



// Rerendering on changing store
