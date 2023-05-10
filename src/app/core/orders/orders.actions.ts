import { createAction, props } from "@ngrx/store";
import { Order } from "../../shared/models/order.model";

export const getOrders = createAction('[Orders] Get Orders');

export const getOrdersSuccess = createAction('[Orders] Get Orders Success', props<{orders: Order[]}>());

export const addToFavourites = createAction('[Orders] Add To Favourites', props<{id: string}>());

export const removeFromFavourites = createAction('[Orders] Remove From Favourites', props<{id: string}>());

export const filterFavourites = createAction('[Orders] Filter Favourites', props<{query: string}>());