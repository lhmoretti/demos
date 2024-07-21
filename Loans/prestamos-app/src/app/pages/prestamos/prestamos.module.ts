import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { PrestamosPageRoutingModule } from "./prestamos-routing.module";

import { PrestamosPage } from "./prestamos.page";
import { PaginacionModule } from "src/app/services/globales/paginacion/paginacion.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PrestamosPageRoutingModule,
    PaginacionModule,
  ],
  declarations: [PrestamosPage],
})
export class PrestamosPageModule {}
