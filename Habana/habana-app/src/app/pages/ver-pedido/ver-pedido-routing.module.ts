import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { VerPedidoPage } from "./ver-pedido.page";

const routes: Routes = [
    {
        path: "",
        component: VerPedidoPage,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class VerPedidoPageRoutingModule {}
