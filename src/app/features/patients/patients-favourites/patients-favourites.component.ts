// import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
//
// import {AppState} from "../../../core/core.module";
// import {select, Store} from "@ngrx/store";
// import {addToFavourites, getPatients, removeFromFavourites} from "../../../core/patients/patients.actions";
// import {selectPatients} from "../../../core/patients/patients.selectors";
// import {Observable} from "rxjs";
// import {map} from "rxjs/operators";
//
// @Component({
//     selector: "st-patients",
//     templateUrl: "./patients.component.html",
//     styleUrls: ["./patients.component.scss"],
//     changeDetection: ChangeDetectionStrategy.OnPush
// })
// export class PatientsFavouritesComponent implements OnInit {
//     patients$: Observable<any[]> = this.store
//         .pipe(
//             select(selectPatients),
//             map(data => data.patients)
//         );
//     displayedColumns: string[] = ['name', 'sex', 'age', 'code', 'fave' ];
//     patientsMap = new Map<string, boolean>();
//
//     constructor(private store: Store<AppState>) {}
//
//     ngOnInit() {
//         this.store.pipe(
//             select(selectPatients),
//             map(data => data.patientsMap)
//         ).subscribe(data => {
//             this.patientsMap = data
//         });
//     }
// }
