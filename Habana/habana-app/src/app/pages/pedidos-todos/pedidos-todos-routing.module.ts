import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CanActivateService } from "src/app/services/auth/can-activate.service";

import { PedidosTodosPage } from "./pedidos-todos.page";

const routes: Routes = [
    {
        path: "",
        component: PedidosTodosPage,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PedidosTodosPageRoutingModule {}
