import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { PrestamosDetallesPage } from "./prestamos-detalles.page";

const routes: Routes = [
  {
    path: "",
    component: PrestamosDetallesPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrestamosDetallesPageRoutingModule {}
