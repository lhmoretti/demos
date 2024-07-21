import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { PrestamosDetallesPageRoutingModule } from "./prestamos-detalles-routing.module";

import { PrestamosDetallesPage } from "./prestamos-detalles.page";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PrestamosDetallesPageRoutingModule,
  ],
  declarations: [PrestamosDetallesPage],
})
export class PrestamosDetallesPageModule {}
