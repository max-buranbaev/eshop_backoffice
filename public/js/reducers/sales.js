import _ from 'lodash'

var initialState = {
    selling: {
        visble: "",
        good: ""
    },
    sales: []
};

var Reducer = function(state = initialState, action) {
    switch (action.type) {

        case "SELLING_CHANGE_MODAL_STATE":
            return Object.assign({}, state, {
                selling: {
                    visible: action.visible,
                    good: action.good
                }
            });
            break;

        case "FETCH_SALES":
            return Object.assign({}, state, {
                sales: action.payload
            });
            break;

        case "SELLING_ADD":
            return Object.assign({}, state, {
                sales: state.sales.concat(action.payload)
            });
            break;

        case "DELETE_SELLING":
            return Object.assign({}, state, {
                sales: _.filter(state.sales, (o) => o._id != action.payload._id)
            });

        default:
            return state;
    }
}

export default Reducer
