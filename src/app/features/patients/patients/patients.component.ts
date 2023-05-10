import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from "@angular/core";

import { AppState } from "../../../core/core.module";
import { select, Store } from "@ngrx/store";
import {
  addToFavourites,
  filterFavourites,
  getPatients,
  removeFromFavourites
} from "../../../core/patients/patients.actions";
import { selectPatients, selectPatientsFavourites, selectPatientsMap } from "../../../core/patients/patients.selectors";
import { Observable, Subject } from "rxjs";
import { Router } from "@angular/router";
import { MatTableDataSource } from "@angular/material/table";
import { takeUntil } from "rxjs/operators";

@Component({
  selector: "st-patients",
  templateUrl: "./patients.component.html",
  styleUrls: ["./patients.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PatientsComponent implements OnInit, OnDestroy {
  patients$: Observable<MatTableDataSource<any>>;
  displayedColumns: string[] = ['name', 'sex', 'age', 'code', 'fave' ];
  patientsMap = new Map<string, boolean>();
  isFavourites: boolean = false;
  ngDestroyed$ = new Subject();

  constructor(
      private store: Store<AppState>,
      private router: Router
  ) {}

  ngOnInit() {
    const isFavouritesPage = this.router.url.includes('favourites');

    if (isFavouritesPage) {
      this.isFavourites = true;
    }

    this.setPatients(isFavouritesPage);
    this.subscribeToPatientsFavouritesMap();
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
    this.ngDestroyed$.next();
  }

  private setPatients(isFavouritesPage: boolean): void {
    this.patients$ = isFavouritesPage
        ? this.store.pipe(
            select(selectPatientsFavourites),
            takeUntil(this.ngDestroyed$)
        )
        : this.store
            .pipe(
                select(selectPatients),
                takeUntil(this.ngDestroyed$)
            );
  }

  private subscribeToPatientsFavouritesMap(): void {
    this.store.pipe(
        select(selectPatientsMap),
        takeUntil(this.ngDestroyed$)
    ).subscribe(data => {
      this.patientsMap = data;
    });
  }
}
