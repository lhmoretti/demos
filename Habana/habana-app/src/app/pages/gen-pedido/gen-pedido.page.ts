import { Component, OnInit } from "@angular/core";
import { MesasService } from "src/app/services/mesas.service";
import { Mesas } from "src/app/models/Mesas.model";
import { map, Subscription } from "rxjs";
import { CartService } from "src/app/services/cart.service";
import { Productos } from "src/app/models/Productos.models";
import { AuthService } from "src/app/services/auth/auth.service";
import { Empleados } from "src/app/models/Empleados.model";
import { Pedido } from "src/app/models/Pedidos.models";
import { ToastsService } from "src/app/services/toasts.service";
import { GetFechas } from "src/app/utils/get-fecha";
import { Router } from "@angular/router";
import { PedidosService } from "src/app/services/pedidos.service";
import { Socket } from "ngx-socket-io";

@Component({
    selector: "app-gen-pedido",
    templateUrl: "./gen-pedido.page.html",
    styleUrls: ["./gen-pedido.page.scss"],
})
export class GenPedidoPage implements OnInit {
    subsCart: Subscription;

    arrMesas: Mesas[] = [];
    arrProductosAgregados: Productos[] = [];
    Total: number = 0;
    subsUsuario: Subscription;
    Pedido: Pedido = {};
    Usuario: Empleados = {};

    constructor(
        private socket: Socket,
        private mesService: MesasService,
        private cartService: CartService,
        private authService: AuthService,
        private toastService: ToastsService,
        private fechasService: GetFechas,
        private router: Router,
        private _pedidos: PedidosService
    ) {}

    ngOnInit() {
        this.obtenerMesas();
        this.subsCart = this.cartService.returnCart().subscribe((data) => {
            this.arrProductosAgregados = data.productos;
            this.Total = data.total;
        });

        this.subsUsuario = this.authService.returnUser().subscribe((data) => {
            this.Usuario = data.usuario;
        });

        this.authService.getUser();

        this.cartService.getCart();
    }

    obtenerMesas() {
        this.mesService.getMesas().subscribe((data) => {
            this.arrMesas = data;
        });
    }

    quitarProducto(producto: Productos) {
        this.cartService.removeProd(producto);
    }

    enviarPedido() {
        this.Pedido.productos = this.arrProductosAgregados;
        this.Pedido.usuario = this.Usuario;
        this.Pedido.fecha = this.fechasService.obtenerFechaActual();
        this.Pedido.hora = this.fechasService.obtenerHora();
        this.Pedido.estado = "Pendiente";

        if (this.Pedido.mesa == undefined) {
            this.toastService.errorToast("¡No ingresaste una mesa!");
            return;
        } else if (
            this.Pedido.productos == undefined ||
            this.Pedido.productos.length == 0
        ) {
            this.toastService.errorToast(
                "¡No cargaste ningún producto todavía!"
            );
            return;
        }

        this._pedidos.postPedido(this.Pedido).subscribe((data) => {
            this._pedidos.adviceUpdateOrders([]);
            this.Pedido = {};
            this.cartService.limpiarCart();
            this.router.navigate(["/main/pedidos-todos"]);
        });
    }
}
