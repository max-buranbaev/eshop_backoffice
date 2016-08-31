import _ from 'loDash'

var initialState = {
    goods: [],
    removingGood: {
      id: null,
      show: false
    }
}

var Reducer = function(state = initialState, action) {
    switch (action.type) {

      case "FETCH_GOODS":
        return Object.assign({}, state, { goods: action.payload });
        break;

      case "REMOVE_GOOD":
        var newGoods = _.filter(state.goods, (good) => good._id != action.id);
        return Object.assign({}, state, { goods: newGoods });
        break;

      case "REMOVING_MODAL_SHOW":
        return Object.assign({}, state, {
          removingGood: {
            id: action.id,
            show: true
          }
        });
        break;

      case "REMOVING_MODAL_CLOSE":
          return Object.assign({}, state, {
            removingGood: {
              id: null,
              show: false
            }
          });
      default:
        return state;
    }
}

export default Reducer;
