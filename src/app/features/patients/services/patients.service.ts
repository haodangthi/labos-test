import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class PatientsService {
    patientsUrl = 'https://api.mocki.io/v2/51597ef3';
    constructor(
        private readonly httpClient: HttpClient,
    ) {}

    getPatients(): Observable<any> {
        return this.httpClient
            .get(this.patientsUrl)
            .pipe(map((response: { patient: any[]}) => response.patient))
    }
}

