import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { ListProductosAddPage } from "./list-productos-add.page";

const routes: Routes = [
    {
        path: "",
        component: ListProductosAddPage,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ListProductosAddPageRoutingModule {}
