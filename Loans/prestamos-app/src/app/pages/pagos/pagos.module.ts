import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { PagosPageRoutingModule } from "./pagos-routing.module";

import { PagosPage } from "./pagos.page";
import { PaginacionModule } from "src/app/services/globales/paginacion/paginacion.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PagosPageRoutingModule,
    PaginacionModule,
  ],
  declarations: [PagosPage],
})
export class PagosPageModule {}
