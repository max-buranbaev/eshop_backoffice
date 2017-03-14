import _ from 'lodash'

var initialState = {
    categories: [],
}

var Reducer = function(state = initialState, action) {
    switch (action.type) {

        case "FETCH_CATEGORIES":
            return Object.assign({}, state, {
                categories: action.payload
            });
            break;

        default:
            return state;
    }
}

export default Reducer
