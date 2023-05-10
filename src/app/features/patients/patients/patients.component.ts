import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";

import {AppState} from "../../../core/core.module";
import {select, Store} from "@ngrx/store";
import {
  addToFavourites,
  filterFavourites,
  getPatients,
  removeFromFavourites
} from "../../../core/patients/patients.actions";
import {selectPatients, selectPatientsFavourites, selectPatientsMap} from "../../../core/patients/patients.selectors";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Router } from "@angular/router";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: "st-patients",
  templateUrl: "./patients.component.html",
  styleUrls: ["./patients.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PatientsComponent implements OnInit {
  patients$: Observable<MatTableDataSource<any>>;
  displayedColumns: string[] = ['name', 'sex', 'age', 'code', 'fave' ];
  patientsMap = new Map<string, boolean>();
  isFavourites: boolean = false;
  dataSource;

  constructor(
      private store: Store<AppState>,
      private router: Router
  ) {}

  ngOnInit() {
    if (this.router.url.includes('favourites')) {
      this.isFavourites = true;

      this.patients$ = this.store.pipe(
          select(selectPatientsFavourites)
      )
    } else {
      this.patients$ = this.store
          .pipe(
              select(selectPatients)
          )
      ;
    }

    this.store.pipe(
        select(selectPatientsMap),
    ).subscribe(data => {
      this.patientsMap = data
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.store.dispatch(filterFavourites({
      query: filterValue.trim().toLowerCase()
    }));
  }

  getPatients(): void {
    this.store.dispatch(getPatients());
  }

  toggleFavourite(id: string): void {
    if (this.patientsMap.get(id)) {
      this.store.dispatch(removeFromFavourites({id}));
    } else {
      this.store.dispatch(addToFavourites({id}));
    }
  }

  calculateAge(birthday: string): number {
    if (!birthday) {
      return;
    }

    const ageDifMs = Date.now() - (+ new Date(birthday));
    const ageDate = new Date(ageDifMs);

    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }

  ngOnDestroy(): void {
    this.store.dispatch(filterFavourites({
      query: ''
    }));
  }
}
