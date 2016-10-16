export const FETCH_GOODS_URI = "/goods/";
export const SYNC_GOODS_URI = "/goods/sync/";

export const FETCH_SALES_URI = "/sales/";
export const ADD_SELLING_URI = "/sales/";
export const DELETE_SELLING_URI = "/sales/";

export const EXPENDITURE_URI = "/expenditures/";

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
            return "Не указан";
            break;

    }
}

export function getType(type) {
    switch (parseInt(type)) {
        case 1:
            return "Реклама";
            break;
        case 2:
            return "Офис";
            break;
        case 3:
            return "Прочее";
            break;
        default:
            return "Не указано";
            break;
    }
}