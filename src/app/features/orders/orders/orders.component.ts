import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";

import { AppState } from "../../../core/core.module";
import { select, Store } from "@ngrx/store";
import { Router } from "@angular/router";
import { Observable, Subject } from "rxjs";
import { MatTableDataSource } from "@angular/material/table";
import { takeUntil } from "rxjs/operators";
import { selectOrders, selectOrdersFavourites, selectOrdersMap } from "../../../core/orders/orders.selectors";
import { addToFavourites, filterFavourites, removeFromFavourites } from "../../../core/orders/orders.actions";
import { getOrders } from "../../../core/orders/orders.actions";
import { Order } from "../../../shared/models/order.model";

@Component({
  selector: "st-orders",
  templateUrl: "./orders.component.html",
  styleUrls: ["./orders.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrdersComponent implements OnInit {
  orders$: Observable<MatTableDataSource<Order>>;
  displayedColumns: string[] = ['creator', 'patient', 'orderName', 'status', 'fave' ];
  ordersMap = new Map<string, boolean>();
  isFavourites: boolean = false;
  ngDestroyed$: Subject<void> = new Subject();
  constructor(
      private store: Store<AppState>,
      private router: Router
  ) {}

  ngOnInit() {
    const isFavouritesPage = this.router.url.includes('favourites');

    if (isFavouritesPage) {
      this.isFavourites = true;
    }

    this.setOrders(isFavouritesPage);
    this.subscribeToOrdersFavouritesMap();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;

    this.store.dispatch(filterFavourites({
      query: filterValue.trim().toLowerCase()
    }));
  }

  getOrders(): void {
    this.store.dispatch(getOrders());
  }

  toggleFavourite(id: string): void {
    if (this.ordersMap.get(id)) {
      this.store.dispatch(removeFromFavourites({id}));
    } else {
      this.store.dispatch(addToFavourites({id}));
    }
  }

  private setOrders(isFavouritesPage: boolean): void {
    this.orders$ = isFavouritesPage
        ? this.store.pipe(
            select(selectOrdersFavourites),
            takeUntil(this.ngDestroyed$)
        )
        : this.store
            .pipe(
                select(selectOrders),
                takeUntil(this.ngDestroyed$)
            );
  }

  private subscribeToOrdersFavouritesMap(): void {
    this.store.pipe(
        select(selectOrdersMap),
        takeUntil(this.ngDestroyed$)
    ).subscribe(data => {
      this.ordersMap = data;
    });
  }
}
