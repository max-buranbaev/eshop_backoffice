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
      good: {}
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

      case "CHANGE_GOOD":
        var newGoods = [].concat(state.goods);
        newGoods.forEach( (good, index) => {
          if(good._id == state.changingGood.good._id) {
            newGoods[index].name = state.changingGood.good.name;
            newGoods[index].purchasePrice = state.changingGood.good.purchasePrice;
            newGoods[index].price = state.changingGood.good.price;
          }
        });
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
        console.log("good in reducer is " + action.good._id);
        return Object.assign({}, state, {
          changingGood: {
            show: true,
            good: action.good
          }
        });
      break;

      case "CHANGING_GOOD_MODAL_CLOSE":
        return Object.assign({}, state, {
          changingGood: {
            show: false,
            good: {}
          }
        });
        break;

      case "CHANGE_GOOD_FIELD":
        var newGood = Object.assign({}, state.changingGood.good);
        _.update(newGood, action.name, (n) => action.value );
        return Object.assign({}, state, {
          changingGood: {
            show: true,
            good: newGood
          }
        });
        break;


      default:
        return state;
    }
}

export default Reducer;
