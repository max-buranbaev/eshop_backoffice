import _ from 'loDash'

var initialState = {
    goods: [],
    removingGood: {
      id: null,
      show: false
    },
    addingGood: {
      show: false
    },
    changingGood: {
      show: false,
      good: {
        id: null,
        name: null,
        purchasePrice: null,
        price: null
      }
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
      break;

      case "ADDING_GOOD_MODAL_SHOW":
        return Object.assign({}, state, {
          addingGood: {
            show: true
          }
        });
      break;

      case "ADDING_GOOD_MODAL_CLOSE":
        return Object.assign({}, state, {
          addingGood: {
            show: false
          }
        });
      break;

      case "ADD_GOOD":
        return Object.assign({}, state, {
          addingGood: {
            show: false
          },
          goods: state.goods.concat(action.newGood)
        });
      break;

      case "CHANGING_GOOD_MODAL_SHOW":
        return Object.assign({}, state, {
          changingGood: {
            show: true,
            name: action.name,
            id: action.id,
            purchasePrice: action.purchasePrice,
            price: action.price
          }
        });
      break;

      default:
        return state;
    }
}

export default Reducer;
