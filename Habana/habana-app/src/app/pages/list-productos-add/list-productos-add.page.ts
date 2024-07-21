import { Component, OnInit } from "@angular/core";
import { ProductosService } from "src/app/services/productos.service";
import { Productos } from "src/app/models/Productos.models";
import { ToastsService } from "src/app/services/toasts.service";
import { CartService } from "src/app/services/cart.service";
import { Subscription } from "rxjs";

@Component({
    selector: "app-list-productos-add",
    templateUrl: "./list-productos-add.page.html",
    styleUrls: ["./list-productos-add.page.scss"],
})
export class ListProductosAddPage implements OnInit {
    arrProductos: Productos[] = [];
    arrProdsCargados: Productos[] = [];
    subsCart: Subscription;

    constructor(
        private prodService: ProductosService,
        private toastService: ToastsService,
        private cartService: CartService
    ) {}

    ngOnInit() {
        this.subsCart = this.cartService.returnCart().subscribe((data) => {
            //  console.log(data);

            this.arrProdsCargados = data.productos;
        });

        this.cartService.getCart();
    }

    async ionViewWillEnter() {
        await this.toastService.mostrarLoading();
        this.obtenerProductos();
    }

    obtenerProductos() {
        this.prodService.getAllProductos().subscribe(
            (data) => {
                if (data.length === 0)
                    this.toastService.alertToast(
                        "No se encontraron productos."
                    );
                else this.arrProductos = data;
                this.toastService.esconderLoading();
            },
            (err) => {
                this.toastService.errorToast("Ocurrió un error.");
                console.log(err);
            }
        );
    }

    agregarProducto(prod: Productos) {
        this.cartService.addCart(prod, 1);
    }

    quitarProducto(prod: Productos) {
        this.cartService.removeCart(prod, 1);
    }
}
