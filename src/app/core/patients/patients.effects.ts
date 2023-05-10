import { Injectable } from '@angular/core';
import { ofType, createEffect, Actions } from '@ngrx/effects';
import { map, switchMap, tap} from 'rxjs/operators';
import {getPatients, getPatientsSuccess} from "./patients.actions";
import {PatientsService} from "../../features/patients/services/patients.service";
import { Store} from "@ngrx/store";

// export const PATIENTS_KEY = "PATIENTS";
@Injectable()
export class PatientsEffects {
    getPatients$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(getPatients),
                switchMap(() => this.patientsService.getPatients()),
                map((data) => getPatientsSuccess({ patients: data }))
            )
    );

    constructor(
        private actions$: Actions,
        private patientsService: PatientsService,
        private store: Store
    ) {}
}
