import React from 'react'
import ReactDOM from 'react-dom'
import Layout from './components/Layout'
import Catalog from './components/catalog/catalog.jsx'
import SalesTable from './components/sales/salesTable.jsx'
import store from './store.js'
import axios from 'axios'

import { Provider } from 'react-redux'
import { Router, Route, IndexRoute, browserHistory, hashHistory } from 'react-router'

const router = (
    <Provider store={ store }>
        <Router history={ hashHistory }>
            <Route path="/" component={ Layout }>
                <IndexRoute component={ Catalog }></IndexRoute>
                <Route path="/sales" component={ SalesTable }></Route>
            </Route>
        </Router>
    </Provider>
)
// Render
var render = function() {
  ReactDOM.render( router, document.getElementById("root"))
}
render();

window.store = store;
store.subscribe(render);
