'use strict'
import axios from 'axios'

export function addSelling(selling) {
  return function (dispatch) {
    axios.put('/selling', selling)
      .then( (response) => {
        dispatch({
          type: "SELLING_CHANGE_MODAL_STATE",
          visible: false,
          good: {}
        })
      })
  }
}

