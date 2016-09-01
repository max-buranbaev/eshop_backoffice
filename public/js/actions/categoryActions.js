import axios from 'axios';


export function fetchCategories() {
  return function (dispatch) {
    axios.get('/categories')
      .then( (response) => {
        dispatch({
          type: "FETCH_CATEGORIES",
          payload: response.data
        })
      })
  }
}

export function removeCategory(_id) {
  return function (dispatch) {
    axios.post('/categories/remove', { id: _id })
      .then(function (response) {
        dispatch({
          type: "REMOVE_CATEGORY",
          id: _id
        });
        dispatch({
          type: "REMOVING_MODAL_CLOSE"
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }
}

export function addCategory(name) {
  return function (dispatch) {
    axios.post('/categories/add', { name: name })
      .then(function (response) {
        dispatch({
          type: "ADD_CATEGORY",
          newCategory: response.data
        })
      })
      .catch(function (error) {
        console.log(error);
      });
  }
}
