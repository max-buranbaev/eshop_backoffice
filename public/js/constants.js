export const FETCH_GOODS_URI = "/goods/"
export const SYNC_GOODS_URI = "/goods/sync/"

export const FETCH_SALES_URI = "/sales/"
export const ADD_SELLING_URI = "/sales/"
export const DELETE_SELLING_URI = "/sales/"

export function getSource(source) {
    switch (parseInt(source)) {
        case 1:
            return "Интернет";
            break;
        case 2:
            return "Больница";
            break;
        case 3:
            return "Газета";
            break;
        default:
            return "Не указан"
            break;

    }
}
