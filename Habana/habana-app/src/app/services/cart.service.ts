import { Injectable } from "@angular/core";
import { Subject, Observable } from "rxjs";
import { Productos } from "../models/Productos.models";
import { ToastsService } from "./toasts.service";

@Injectable({
    providedIn: "root",
})
export class CartService {
    subjCart = new Subject<any>();
    arrProductos: Productos[] = [];
    Total: number = 0;

    constructor(private toastService: ToastsService) {}

    returnCart(): Observable<any> {
        return this.subjCart.asObservable();
    }

    getCart() {
        this.subjCart.next({
            productos: this.arrProductos,
            total: this.Total,
        });
    }

    addCart(prod: Productos, cant) {
        let enco = this.arrProductos.find((e) => e._id == prod._id);
        let ind = this.arrProductos.findIndex((e) => e._id == prod._id);

        if (enco == undefined) {
            prod.cantidad = cant;
            this.arrProductos.push(prod);
        } else {
            enco.cantidad += cant;
            this.arrProductos.splice(ind, 1, enco);
        }

        this.getCart();
        this.obtenerTotal();
    }

    removeCart(prod: Productos, cant) {
        if (this.arrProductos.length != 0) {
            let enco = this.arrProductos.find((e) => e._id === prod._id);
            let ind = this.arrProductos.findIndex((e) => e._id === prod._id);

            if (enco != undefined) {
                enco.cantidad -= cant;
                if (enco.cantidad < 1) {
                    this.arrProductos.splice(ind, 1);
                }
            } else {
                this.toastService.errorToast(
                    "Este producto no está cargado todavia."
                );
                return null;
            }
        } else {
            this.toastService.errorToast(
                "Este producto no está cargado todavia."
            );
            return null;
        }

        this.getCart();
        this.obtenerTotal();
    }

    removeProd(prod) {
        let ind = this.arrProductos.findIndex((e) => e._id === prod._id);
        this.arrProductos.splice(ind, 1);
        this.obtenerTotal();
        this.getCart();
    }

    obtenerTotal() {
        this.Total = 0;
        for (let i of this.arrProductos) {
            this.Total += i.precio * i.cantidad;
        }
        this.getCart();
    }

    limpiarCart() {
        this.arrProductos = [];
        this.Total = 0;
        this.getCart();
    }
}
