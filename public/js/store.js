import { applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import reducer from './reducers';
import promise from 'redux-promise-middleware';
import loadItems from './middlewares/loadItems.js'
import deleteItem from './middlewares/deleteItem.js'
import createItem from './middlewares/createItem.js'

const middleware = applyMiddleware(promise(), thunk, loadItems, deleteItem, createItem, logger());
const store = createStore(reducer, middleware);

export default store;
