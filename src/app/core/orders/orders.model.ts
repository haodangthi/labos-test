import { Order } from "../../shared/models/order.model";

export interface OrdersState {
    orders: Order[];
    ordersMap: Map<string, boolean>;
    query: string;
}