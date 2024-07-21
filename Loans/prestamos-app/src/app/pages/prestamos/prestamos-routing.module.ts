import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { PrestamosPage } from "./prestamos.page";

const routes: Routes = [
  {
    path: "",
    component: PrestamosPage,
  },
  {
    path: "form-prestamos",
    loadChildren: () =>
      import("./form-prestamos/form-prestamos.module").then(
        (m) => m.FormPrestamosPageModule,
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrestamosPageRoutingModule {}
