import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { PatientsComponent } from "./patients/patients.component";

const routes: Routes = [
  {
    path: "",
    component: PatientsComponent,
    data: { title: "stms.menu.patients" }
  },
  {
    path: "favourites",
    component: PatientsComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientsRoutingModule {}
