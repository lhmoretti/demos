import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { ClientesPage } from "./clientes.page";

const routes: Routes = [
  {
    path: "",
    component: ClientesPage,
  },
  {
    path: "form-cliente",
    loadChildren: () =>
      import("./form-cliente/form-cliente.module").then(
        (m) => m.FormClientePageModule,
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientesPageRoutingModule {}
