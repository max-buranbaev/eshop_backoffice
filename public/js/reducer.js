import _ from 'loDash'

var initialState = {
    categories: [],
    goods: [],
    removingModal: {
      id: null,
      type: null,
      show: false
    },
    addingGood: {
      show: false
    },
    changingGood: {
      show: false,
      good: {}
    },
    addingCategory: {
      show: false
    }
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
