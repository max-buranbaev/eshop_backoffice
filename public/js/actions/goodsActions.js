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

export function syncGoods() {
  return function(dispatch) {
    axios.post('/goods/sync')
      .then( (response) => {
        dispatch({
          type: "SYNC_GOODS",
          payload: response.data
        })
      })
  }
}
