import axios from 'axios';


export function fetchGoods() {
  return function (dispatch) {
    axios.get('/goods')
      .then( (response) => {
        console.log(response.data);
        dispatch({
          type: "FETCH_GOODS",
          payload: response.data
        })
      })
  }
}

export function removeGood(_id) {
  return function (dispatch) {
    axios.post('/goods/remove', { id: _id })
      .then(function (response) {
        dispatch({
          type: "REMOVE_GOOD",
          id: _id
        })
        dispatch({
          type: "REMOVING_MODAL_CLOSE"
        })
      })
      .catch(function (error) {
        console.log(error);
      });
  }
}

export function addGood(good) {
  return function (dispatch) {
    axios.post('/goods/add', { name: good.name, purchasePrice: good.purchasePrice, price: good.price, category: good.category })
      .then(function (response) {
        dispatch({
          type: "ADD_GOOD",
          newGood: response.data
        })
        dispatch({
          type: "ADDING_GOOD_MODAL_CLOSE"
        })
      })
      .catch(function (error) {
        console.log(error);
      });
  }
}

export function changeGood(store) {
  return function (dispatch) {
    var currentStore = store.getState();

    axios.post('/goods/change', { good: currentStore.changingGood.good })
      .then(function (response) {
        dispatch({
          type: "CHANGE_GOOD",
          newGood: response.data
        })
        dispatch({
          type: "CHANGING_GOOD_MODAL_CLOSE"
        })
      })
      .catch(function (error) {
        console.log(error);
      });
  }
}
