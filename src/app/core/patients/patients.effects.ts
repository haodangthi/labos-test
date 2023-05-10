import { Injectable } from '@angular/core';
import { ofType, createEffect, Actions } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';
import { getPatients, getPatientsSuccess } from "./patients.actions";
import { PatientsService } from "../../features/patients/services/patients.service";

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
    ) {}
}
