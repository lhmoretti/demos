import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { FormPrestamosPage } from "./form-prestamos.page";

const routes: Routes = [
  {
    path: "",
    component: FormPrestamosPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormPrestamosPageRoutingModule {}
