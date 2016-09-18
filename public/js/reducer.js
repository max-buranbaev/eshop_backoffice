import _ from 'loDash'

var initialState = {
    goods: [],
    filteredGoods: []
}

var Reducer = function(state = initialState, action) {
    switch (action.type) {

      case "FETCH_GOODS":
        return Object.assign({}, state, { goods: action.payload });
        break;

      default:
        return state;
    }
}

export default Reducer;
