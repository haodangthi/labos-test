import {createAction, props} from "@ngrx/store";
import {PatientsState} from "./patients.model";

export const getPatients =
    createAction('[Patients] Get Patients');

export const getPatientsSuccess =
    createAction('[Patients] Get Patients Success', props<{patients: any[]}>());

export const addToFavourites = createAction('[Patients] Add To Favourites', props<{id: string}>());
export const removeFromFavourites = createAction('[Patients] Remove From Favourites', props<{id: string}>());

export const filterFavourites = createAction('[Patients] Filter Favourites', props<{query: string}>());