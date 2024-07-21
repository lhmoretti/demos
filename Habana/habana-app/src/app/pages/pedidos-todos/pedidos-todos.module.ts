import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { PedidosTodosPageRoutingModule } from "./pedidos-todos-routing.module";

import { PedidosTodosPage } from "./pedidos-todos.page";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        PedidosTodosPageRoutingModule,
    ],
    declarations: [PedidosTodosPage],
})
export class PedidosTodosPageModule {}
