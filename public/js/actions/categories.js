import axios from 'axios'
import { FETCH_CATEGORIES_URI } from '../constants'

export function fetchCategories() {
    return {
        type: "FETCH_CATEGORIES",
        loadItems: {
            url: FETCH_CATEGORIES_URI
        }
    }
}
