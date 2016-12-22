import goods from './goods'
import sales from './sales'
import expenditures from './expenditure'
import stat from './stat'
import { combineReducers } from 'redux'


export default combineReducers({
    goods,
    sales,
    expenditures,
    stat
})
