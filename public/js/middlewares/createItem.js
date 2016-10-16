import axios from 'axios'

export default (store) => (next) => (action) => {
    const { createItem } = action;

    if(!createItem) return next(action)

    axios.post(createItem.url, { item: createItem.data })
        .then( (response) => {
            if(response.status != 200) {
                console.log(response);
            } else {
                action.payload = response.data;
                return next(action);
            }

        })
        .catch( (error) => {
            console.log(error);
        });
}