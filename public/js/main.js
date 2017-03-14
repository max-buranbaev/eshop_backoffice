import React from 'react'
import ReactDOM from 'react-dom'
import Layout from './components/Layout'
import Catalog from './components/catalog/catalog.jsx'
import SalesTable from './components/sales/salesTable.jsx'
import Statistics from './components/statistics/statistics.jsx'
import Expenditures from './components/expenditures/expenditures.jsx'
import CategoriesTable from './components/catalog/categoriesTable.jsx'
import store from './store.js'


import { Provider } from 'react-redux'
import { Router, Route, IndexRoute, browserHistory, hashHistory } from 'react-router'

const router = (
    <Provider store={ store }>
        <Router history={ hashHistory }>
            <Route path="/" component={ Layout }>
                <IndexRoute component={ Catalog }></IndexRoute>
                <Route path="/sales" component={ SalesTable }></Route>
                <Route path="/categories" component={ CategoriesTable }></Route>
                <Route path="/statistics" component={ Statistics }></Route>
                <Route path="/expenditures" component={ Expenditures }></Route>
            </Route>
        </Router>
    </Provider>
)
// Render
const render = () => {
  ReactDOM.render( router, document.getElementById("root"))
};
render();

window.store = store;
store.subscribe(render);
