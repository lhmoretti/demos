import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { GenPedidoPageRoutingModule } from "./gen-pedido-routing.module";

import { GenPedidoPage } from "./gen-pedido.page";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        GenPedidoPageRoutingModule,
    ],
    declarations: [GenPedidoPage],
})
export class GenPedidoPageModule {}
