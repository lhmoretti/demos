import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { EmpleadosPage } from "./empleados.page";

const routes: Routes = [
    {
        path: "",
        component: EmpleadosPage,
    },
    {
        path: "crud-empleados/:id",
        loadChildren: () =>
            import("./crud-empleados/crud-empleados.module").then(
                (m) => m.CrudEmpleadosPageModule
            ),
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class EmpleadosPageRoutingModule {}
