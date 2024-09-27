export interface IHistoryOrderBody{
    id: string;
    img_product: string;
    order_number: string;
    created_date: string;
    product_price: string;
    status: string;
}
export interface IFilterHistoryOrder{
    id: string;
    status: string;
}