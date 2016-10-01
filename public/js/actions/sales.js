import axios from 'axios'
import { FETCH_SALES_URI, DELETE_SELLING_URI, ADD_SELLING_URI } from '../constants'

export function addSelling(selling) {
  return function (dispatch) {
    axios.put(ADD_SELLING_URI, selling)
      .then( (response) => {
        dispatch({
          type: "SELLING_CHANGE_MODAL_STATE",
          visible: false,
          good: {}
        })
      })
  }
}

export function fetchSales() {
    return {
        type: "FETCH_SALES",
        loadItems: {
            url: FETCH_SALES_URI
        }
    }
}

export function deleteSelling(id) {
    return {
        type: "DELETE_SELLING",
        deleteItem: {
            url: DELETE_SELLING_URI + id
        }
    }
}
