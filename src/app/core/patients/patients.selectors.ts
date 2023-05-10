import { createSelector } from "@ngrx/store";
import { selectPatientsState } from "../core.state";
import { PatientsState } from "./patients.model";
import { MatTableDataSource } from "@angular/material/table";

export const selectPatients = createSelector(
    selectPatientsState,
    (state: PatientsState) => new MatTableDataSource(state.patients)
);

export const selectPatientsMap = createSelector(
    selectPatientsState,
    (state: PatientsState) => state.patientsMap
);

export const selectPatientsFavourites = createSelector(
    selectPatientsState,
    (state: PatientsState) => {
        const favourites = state.patients.filter(patient => state.patientsMap.get(patient.defaultId));
        const dataSource = new MatTableDataSource(favourites);
        dataSource.filter = state.query;

        return dataSource;
    }
);
