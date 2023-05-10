import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class OrdersService {
    ordersUrl = 'https://api.mocki.io/v2/79fb05cb';
    constructor(
        private readonly httpClient: HttpClient,
    ) {}

    getOrders(): Observable<any> {
        return this.httpClient
            .get(this.ordersUrl)
            .pipe(map((response: { order: any[]}) => response.order))
    }
}