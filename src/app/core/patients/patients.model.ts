import { Patient } from "../../shared/models/patient.model";

export interface PatientsState {
    patients: Patient[],
    patientsMap: Map<string, boolean>
    query?: string;
}