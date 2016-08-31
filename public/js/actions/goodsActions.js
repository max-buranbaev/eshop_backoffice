import axios from 'axios';

export function fetchGoods() {
  return function (dispatch) {
    axios.get('/goods')
      .then( (response) => {
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
