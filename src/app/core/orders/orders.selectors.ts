import { createSelector } from "@ngrx/store";
import { MatTableDataSource } from "@angular/material/table";
import { OrdersState } from "./orders.model";
import { selectOrdersState } from "../core.state";

// @ts-ignore
export const selectOrders = createSelector(
    selectOrdersState,
    (state: OrdersState) => new MatTableDataSource(state.orders)
);

export const selectOrdersMap = createSelector(
    selectOrdersState,
    (state: OrdersState) => state.ordersMap
);

export const selectOrdersFavourites = createSelector(
    selectOrdersState,
    (state: OrdersState) => {
        const favourites = state.orders.filter(order => state.ordersMap.get(order.identifier));
        const dataSource = new MatTableDataSource(favourites);
        dataSource.filter = state.query;

        return dataSource;
    }
);
