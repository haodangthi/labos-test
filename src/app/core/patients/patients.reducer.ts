import {PatientsState} from "./patients.model";
import {Action, createReducer, on} from "@ngrx/store";
import {addToFavourites, filterFavourites, getPatientsSuccess, removeFromFavourites} from "./patients.actions";
import {state} from "@angular/animations";

const patientsMap = new Map<string, boolean>();
export const initialState: PatientsState = {
    patients: [],
    patientsMap
}

const reducer = createReducer(
    initialState,
    on(
        getPatientsSuccess,
        (state, { patients }) => ({...state, patients })
    ),
    on(
        addToFavourites,
        (state, {id}) => ({...state, patientsMap: state.patientsMap.set(id, true)})
    ),
    on(
        removeFromFavourites,
        (state, {id}) => ({...state, patientsMap: state.patientsMap.set(id, false)})
    ),
    on(
        filterFavourites,
        (state, {query}) => ({...state, query})
    )
)

export function patientsReducer(
    state: PatientsState | undefined,
    action: Action
) {
    return reducer(state, action);
}