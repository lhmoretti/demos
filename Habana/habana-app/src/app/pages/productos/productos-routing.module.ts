import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { ProductosPage } from "./productos.page";

const routes: Routes = [
    {
        path: "",
        component: ProductosPage,
    },
    {
        path: "crud-productos/:id",
        loadChildren: () =>
            import("./crud-productos/crud-productos.module").then(
                (m) => m.CrudProductosPageModule
            ),
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ProductosPageRoutingModule {}
