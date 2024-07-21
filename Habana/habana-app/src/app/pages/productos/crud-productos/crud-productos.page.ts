import { Component, OnInit } from "@angular/core";
import { Productos } from "src/app/models/Productos.models";
import { NgForm } from "@angular/forms";
import { ProductosService } from "src/app/services/productos.service";
import { ToastsService } from "src/app/services/toasts.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
    selector: "app-crud-productos",
    templateUrl: "./crud-productos.page.html",
    styleUrls: ["./crud-productos.page.scss"],
})
export class CrudProductosPage implements OnInit {
    showActualizar: boolean = false;
    Producto: Productos = {};
    id: any;

    constructor(
        private router: Router,
        private prodService: ProductosService,
        private toastService: ToastsService,
        private actRouter: ActivatedRoute
    ) {}

    ngOnInit() {
        this.id = this.actRouter.snapshot.paramMap.get("id");
        if (this.id == 0) {
            this.showActualizar = false;
        } else {
            this.obtenerProductoId();
            this.showActualizar = true;
        }
    }

    obtenerProductoId() {
        this.prodService.getProductoId(this.id).subscribe((data) => {
            this.Producto = data;
        });
    }

    enviarProducto(form: NgForm) {
        if (form.invalid) {
            this.toastService.errorToast("Todos los campos son obligatorios");
            return;
        }

        if (this.id == 0) {
            this.prodService.postProducto(this.Producto).subscribe((data) => {
                this.router.navigate(["/main/productos"]).then(() => {
                    this.toastService.successToast(
                        "¡Producto agregado con éxito!"
                    );
                });
            });
        } else {
            this.prodService.updateProducto(this.Producto).subscribe((data) => {
                this.router.navigate(["/main/productos"]).then(() => {
                    this.toastService.successToast(
                        "¡Producto editado con exito!"
                    );
                });
            });
        }
    }
}
