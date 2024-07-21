import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { PedidosService } from 'src/app/services/pedidos.service';
import { Pedidos } from 'src/app/models/Pedidos';
import { AlertasService } from 'src/app/services/globales/alertas.service';

@Component({
    selector: 'app-modal-pedido',
    templateUrl: './modal-pedido.component.html',
    styleUrls: ['./modal-pedido.component.css'],
})
export class ModalPedidoComponent implements OnInit, OnDestroy {
    public pedidoSubs: Subscription;
    pedido: Pedidos = null;

    constructor(private _pedidos: PedidosService) {
        this.pedidoSubs = this._pedidos.returnPedido().subscribe(
            (data: Pedidos) => (this.pedido = data),
            (error) => console.log(error),
        );
    }

    ngOnInit(): void {}

    ngOnDestroy(): void {
        this.pedidoSubs.unsubscribe();
    }

    changeEstado(estado: string) {
        this._pedidos.changeEstado(this.pedido, estado);
    }
}
