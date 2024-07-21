import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Storage } from "@ionic/storage-angular";
import { PedidosService } from "src/app/services/pedidos.service";
import { Pedido } from "src/app/models/Pedidos.models";
import { Empleados } from "src/app/models/Empleados.model";
import { AuthService } from "src/app/services/auth/auth.service";
import { Observable, Subscription } from "rxjs";

@Component({
    selector: "app-ver-pedido",
    templateUrl: "./ver-pedido.page.html",
    styleUrls: ["./ver-pedido.page.scss"],
})
export class VerPedidoPage implements OnInit {
    id: any;
    User: Empleados = <Empleados>{};
    Productos: any[] = [];
    total: number = 0;
    loading: boolean = true;
    Pedido: Pedido = <Pedido>{
        usuario: {
            nombre: "",
            apellido: "",
        },
    };
    // Usuario: Empleados = <Empleados>{};
    subsUsuario: Subscription;

    constructor(
        private actRouter: ActivatedRoute,
        private _pedidos: PedidosService,
        private authService: AuthService,
        private router: Router
    ) {}

    ngOnInit() {
        this.obtenerPedido();
        this.subsUsuario = this.authService
            .returnUser()
            .subscribe(async (data) => {
                this.User = await data.usuario;
            });

        this.authService.getUser();
    }

    obtenerPedido() {
        this.loading = true;
        this.actRouter.params.subscribe((params: Params) => {
            this._pedidos.getPedidoById(params["id"]).subscribe((data: any) => {
                this.Pedido = data;
                this.loading = false;
                this.Productos = data.productos;
                this.obtenerTotal();
            });
        });
    }

    obtenerTotal() {
        this.total = 0;
        for (let i of this.Productos) {
            this.total += i.precio * i.cantidad;
        }
    }

    updatePedido() {
        if (this.Pedido.estado == "Pendiente") {
            this.Pedido.estado = "Listo";
            this._pedidos.update(this.Pedido).subscribe((data) => {
                console.log(data);
                this.router.navigateByUrl("/main/pedidos-todos").then(() => {
                    this._pedidos.adviceUpdateOrders([]);
                });
            });
        } else if (this.Pedido.estado == "Listo") {
            this.Pedido.estado = "Entregado";
            this._pedidos.update(this.Pedido).subscribe((data) => {
                this.router.navigateByUrl("/main/pedidos-todos").then(() => {
                    this._pedidos.adviceUpdateOrders([]);
                });
            });
        }
    }
}
