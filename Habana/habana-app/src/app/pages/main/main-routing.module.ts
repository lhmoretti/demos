import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { MainPage } from "./main.page";
import { CanLoadGuard } from "src/app/services/auth/can-load.guard";

const routes: Routes = [
    {
        path: "",
        component: MainPage,
        canActivate: [CanLoadGuard],
        children: [
            {
                path: "",
                redirectTo: "pedidos-todos",
                pathMatch: "full",
            },
            {
                path: "empleados",
                children: [
                    {
                        path: "",
                        loadChildren: () =>
                            import("../empleados/empleados.module").then(
                                (m) => m.EmpleadosPageModule
                            ),
                    },
                ],
            },
            {
                path: "mesas",
                children: [
                    {
                        path: "",
                        loadChildren: () =>
                            import("../mesas/mesas.module").then(
                                (m) => m.MesasPageModule
                            ),
                    },
                ],
            },
            {
                path: "pedidos-todos",
                children: [
                    {
                        path: "",
                        loadChildren: () =>
                            import(
                                "../pedidos-todos/pedidos-todos.module"
                            ).then((m) => m.PedidosTodosPageModule),
                    },
                ],
            },
            {
                path: "productos",
                children: [
                    {
                        path: "",
                        loadChildren: () =>
                            import("../productos/productos.module").then(
                                (m) => m.ProductosPageModule
                            ),
                    },
                ],
            },
            {
                path: "gen-pedido",
                children: [
                    {
                        path: "",
                        loadChildren: () =>
                            import("../gen-pedido/gen-pedido.module").then(
                                (m) => m.GenPedidoPageModule
                            ),
                    },
                ],
            },
            {
                path: "lista-prods-add",
                children: [
                    {
                        path: "",
                        loadChildren: () =>
                            import(
                                "../list-productos-add/list-productos-add.module"
                            ).then((m) => m.ListProductosAddPageModule),
                    },
                ],
            },
            {
                path: "adm-pedidos",
                children: [
                    {
                        path: "",
                        loadChildren: () =>
                            import("../adm-pedidos/adm-pedidos.module").then(
                                (m) => m.AdmPedidosPageModule
                            ),
                    },
                ],
            },
            {
                path: "ver-pedido/:id",
                children: [
                    {
                        path: "",
                        loadChildren: () =>
                            import("../ver-pedido/ver-pedido.module").then(
                                (m) => m.VerPedidoPageModule
                            ),
                    },
                ],
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class MainPageRoutingModule {}
