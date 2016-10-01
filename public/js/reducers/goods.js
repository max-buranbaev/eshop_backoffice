import _ from 'loDash'

var initialState = {
    goods: [],
    filteredGoods: []
}

var Reducer = function(state = initialState, action) {
    switch (action.type) {

        case "FETCH_GOODS":
            return Object.assign({}, state, {
                goods: action.payload,
                filteredGoods: action.payload
            });
            break;

        case "SYNC_GOODS":
            return Object.assign({}, state, {
                goods: action.payload,
                filteredGoods: action.payload
            });
            break;

        case "FILTER_GOODS":

            var filteredGoods = _.filter(state.goods, function(o) {
                if (o.price == action.filterString || o.purchasePrice == action.filterString || o.name.toLowerCase().match(action.filterString)) {
                    return true;
                }
            })

            return Object.assign({}, state, {
                filteredGoods: filteredGoods
            });
            break;

        default:
            return state;
    }
}

export default Reducer
