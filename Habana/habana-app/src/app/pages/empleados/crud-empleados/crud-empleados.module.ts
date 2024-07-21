import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { CrudEmpleadosPageRoutingModule } from "./crud-empleados-routing.module";

import { CrudEmpleadosPage } from "./crud-empleados.page";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        CrudEmpleadosPageRoutingModule,
    ],
    declarations: [CrudEmpleadosPage],
})
export class CrudEmpleadosPageModule {}
