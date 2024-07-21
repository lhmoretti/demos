import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { VerPedidoPageRoutingModule } from "./ver-pedido-routing.module";

import { VerPedidoPage } from "./ver-pedido.page";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        VerPedidoPageRoutingModule,
    ],
    declarations: [VerPedidoPage],
})
export class VerPedidoPageModule {}
