import { EXPENDITURE_URI } from '../constants'

export function create(data) {
    return {
        type: "EXPENDITURE_CREATE",
        createItem: {
            url: EXPENDITURE_URI,
            data: data
        }
    }
}

export function read() {
    return {
        type: "EXPENDITURES_READ",
        loadItems: {
            url: EXPENDITURE_URI
        }
    }
}

export function deleteItem(id) {
    return {
        type: "EXPENDITURE_DELETE",
        deleteItem: {
            url: EXPENDITURE_URI + id
        }
    }
}