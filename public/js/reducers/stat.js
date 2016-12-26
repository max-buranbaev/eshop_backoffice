import _ from 'lodash'

const Reducer = function(state = [], action) {
    switch (action.type) {

        case "CREATE_CUSTOM_REPORT":
            return Object.assign({}, state, {
                customReport: action.payload
            });
            break;

        case "CREATE_WEEKLY_REPORT":
            return Object.assign({}, state, {
                weeklyReport: action.payload
            });
            break;

        default:
            return state;
    }
};

export default Reducer;
