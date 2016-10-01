import axios from 'axios'

export default (store) => (next) => (action) => {
    const { loadItems } = action;

    if(!loadItems) return next(action);

    axios.get(loadItems.url).then( (response) => {
        action.payload = response.data;
        return next(action);
    })
}
