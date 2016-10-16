import _ from 'lodash'

const initialState = {
    list: [],
    modal: {
        visible: false
    }
};

const Reducer = function (state = initialState, action) {
    switch (action.type) {
        case "EXPENDITURE_CHANGE_MODAL_STATE":
            return Object.assign({}, state, {
                modal: {
                    visible: action.visible
                }
            });
            break;

        case "EXPENDITURE_CREATE":
            return Object.assign({}, state, {
               list: [...state.list, action.payload]
            });
            break;

        case "EXPENDITURES_READ":
            return Object.assign({}, state, {
                list: action.payload
            });
            break;

        case "EXPENDITURE_DELETE":
            let withoutDeleted = _.filter(state.list, (o) => o._id != action.payload);
            return Object.assign({}, state, {
                list: withoutDeleted
            });
            break;

        default:
            return state;
            break;
    }
};

export default Reducer