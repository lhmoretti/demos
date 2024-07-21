import { Component, OnInit } from "@angular/core";
import { Pedido } from "src/app/models/Pedidos.models";
import { Router } from "@angular/router";
import { PedidosService } from "src/app/services/pedidos.service";
import { AlertController } from "@ionic/angular";
import { ToastsService } from "src/app/services/toasts.service";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Productos } from "src/app/models/Productos.models";
import { Socket } from "ngx-socket-io";

@Component({
    selector: "app-adm-pedidos",
    templateUrl: "./adm-pedidos.page.html",
    styleUrls: ["./adm-pedidos.page.scss"],
})
export class AdmPedidosPage implements OnInit {
    pedidos$: Observable<Pedido[]>;
    productos: any[] = [];
    total: number = 0;

    constructor(
        private router: Router,
        private _pedidos: PedidosService,
        public alertController: AlertController,
        private _toast: ToastsService
    ) {}

    ngOnInit() {
        this.getAll();
        this._pedidos.adviceUpdateOrders([]);
    }

    calculateTotal() {
        this.total = 0;
        this.productos.forEach(
            (p: Productos) =>
                (this.total += Number(p.cantidad) * Number(p.precio))
        );
    }

    setProductos(pedidos: Pedido[]): void {
        this.productos = [];
        pedidos.forEach((p: Pedido) =>
            p.productos.forEach((e) => this.productos.push(e))
        );
        this.calculateTotal();
    }

    getAll() {
        this.pedidos$ = this._pedidos.pedidos.pipe(
            map((pedidos) => {
                this.setProductos(pedidos);
                return pedidos;
            })
        );
    }

    ver(id) {
        this.router.navigate(["/main/ver-pedido", id]);
    }

    async delete(id) {
        let tit: string = "Eliminar pedido";
        let msg: string = "¿Desea eliminar el pedido?";
        let alert = await this._toast.deleteToast(tit, msg);

        alert.present();
        alert.onDidDismiss().then((res) => {
            if (res.role === "cancel") return;
            else
                this._pedidos.delete(id).subscribe({
                    next: (data: any) => {
                        this._pedidos.adviceUpdateOrders([]);
                    },
                    error: (err) => console.log(err),
                });
        });
    }

    async deleteAll() {
        let tit: string = "Eliminar pedidos";
        let msg: string = "¿Desea eliminar TODOS los pedidos?";
        let alert = await this._toast.deleteToast(tit, msg);

        alert.present();
        alert.onDidDismiss().then((res) => {
            if (res.role === "cancel") return;
            else
                this._pedidos.deleteAll().subscribe({
                    next: (data: any) => {
                        this._pedidos.adviceUpdateOrders([]);
                    },
                    error: (err) => console.log(err),
                });
        });
    }
}
