import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { FormPrestamosPageRoutingModule } from "./form-prestamos-routing.module";

import { FormPrestamosPage } from "./form-prestamos.page";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormPrestamosPageRoutingModule,
  ],
  declarations: [FormPrestamosPage],
})
export class FormPrestamosPageModule {}
