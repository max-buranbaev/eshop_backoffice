import React from 'react'
import ReactDOM from 'react-dom'
import Dashboard from './components/dashboard.jsx'
import { Provider } from 'react-redux'
import store from './store.js'
import axios from 'axios'



// Render
var render = function() {
  ReactDOM.render(
    <Provider store={store}>
      <Dashboard />
    </Provider>,
    document.getElementById("dashboard")
  )
}
render();

store.subscribe(render);
