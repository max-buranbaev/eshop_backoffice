import goods from './goods'
import sales from './sales'
import expenditures from './expenditure'
import { combineReducers } from 'redux'


export default combineReducers({
    goods,
    sales,
    expenditures
})
