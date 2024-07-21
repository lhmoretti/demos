import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { ClientesPageRoutingModule } from "./clientes-routing.module";

import { ClientesPage } from "./clientes.page";
import { PaginacionModule } from "src/app/services/globales/paginacion/paginacion.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClientesPageRoutingModule,
    PaginacionModule,
  ],
  declarations: [ClientesPage],
})
export class ClientesPageModule {}
