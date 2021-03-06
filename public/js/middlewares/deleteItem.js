import axios from 'axios'

export default (store) => (next) => (action) => {
    var { deleteItem } = action;

    if(!deleteItem) return next(action);

    axios.delete(deleteItem.url).then( (response) => {
        action.payload = response.data;
        return next(action);
    });
}
