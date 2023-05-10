import { Injectable } from '@angular/core';
import { ofType, createEffect, Actions } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';
import { OrdersService } from "../../features/orders/services/orders.service";
import { getOrders, getOrdersSuccess } from "./orders.actions";

@Injectable()
export class OrdersEffects {
    getOrders$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(getOrders),
                switchMap(() => this.ordersService.getOrders()),
                map((data) => getOrdersSuccess({ orders: data }))
            )
    );

    constructor(
        private actions$: Actions,
        private ordersService: OrdersService,
    ) {}
}
