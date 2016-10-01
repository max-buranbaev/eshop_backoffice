import axios from 'axios'
import { FETCH_GOODS_URI, SYNC_GOODS_URI } from '../constants'

export function fetchGoods() {
    return {
        type: "FETCH_GOODS",
        loadItems: {
            url: FETCH_GOODS_URI
        }
    }
}


export function syncGoods() {
    return {
        type: "SYNC_GOODS",
        loadItems: {
            url: SYNC_GOODS_URI
        }
    }
}
