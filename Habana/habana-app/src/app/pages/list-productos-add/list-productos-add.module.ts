import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { ListProductosAddPageRoutingModule } from "./list-productos-add-routing.module";

import { ListProductosAddPage } from "./list-productos-add.page";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ListProductosAddPageRoutingModule,
    ],
    declarations: [ListProductosAddPage],
})
export class ListProductosAddPageModule {}
