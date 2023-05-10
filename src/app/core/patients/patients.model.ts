export interface PatientsState {
    patients: any[],
    patientsMap: Map<string, boolean>
    query?: string;
}