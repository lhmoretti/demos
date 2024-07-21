import { Component, OnInit, OnDestroy } from "@angular/core";
import { Pedido } from "src/app/models/Pedidos.models";
import { map, Observable } from "rxjs";
import { PedidosService } from "src/app/services/pedidos.service";
import { Router } from "@angular/router";
import { Socket } from "ngx-socket-io";

@Component({
    selector: "app-pedidos-todos",
    templateUrl: "./pedidos-todos.page.html",
    styleUrls: ["./pedidos-todos.page.scss"],
})
export class PedidosTodosPage implements OnInit {
    pedidos: Observable<Pedido[]>;
    arrPedidos: Pedido[] = [];

    constructor(
        private socket: Socket,
        private router: Router,
        private _pedidos: PedidosService
    ) {}

    ngOnInit() {
        this.getPedidosAll();
        this.socket.emit("getAll", []);
    }

    verPedido(id) {
        this.router.navigate(["/main/ver-pedido", id]);
    }

    getPedidosAll() {
        this.pedidos = this._pedidos.pedidos.pipe(
            map((pedidos: any) => {
                for (let pedido of pedidos) {
                    if (pedido.estado == "Pendiente") {
                        pedido.icon = "time";
                        pedido.color = "danger";
                        pedido.txtColor = "light";
                        this.arrPedidos.push(pedido);
                    } else if (pedido.estado == "Listo") {
                        pedido.icon = "alert-circle";
                        pedido.color = "warning";
                        pedido.txtColor = "dark";
                        this.arrPedidos.push(pedido);
                    } else if (pedido.estado == "Entregado") {
                        pedido.icon = "checkmark-circle";
                        pedido.color = "success";
                        pedido.txtColor = "dark";
                        this.arrPedidos.push(pedido);
                    }
                }
                return pedidos;
            })
        );
    }
}
