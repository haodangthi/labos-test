import { Action, createReducer, on } from "@ngrx/store";
import { OrdersState } from "./orders.model";
import {
    addToFavourites,
    filterFavourites,
    getOrdersSuccess,
    removeFromFavourites
} from "./orders.actions";

const ordersMap = new Map<string, boolean>();
export const initialState: OrdersState = {
    orders: [],
    ordersMap,
    query: ''
}

const reducer = createReducer(
    initialState,
    on(
        getOrdersSuccess,
        (state, { orders }) => ({...state, orders })
    ),
    on(
        addToFavourites,
        (state, {id}) => ({...state, ordersMap: state.ordersMap.set(id, true)})
    ),
    on(
        removeFromFavourites,
        (state, {id}) => ({...state, ordersMap: state.ordersMap.set(id, false)})
    ),
    on(
        filterFavourites,
        (state, {query}) => ({...state, query})
    )
)


export function ordersReducer(
    state: OrdersState | undefined,
    action: Action
) {
    return reducer(state, action);
}