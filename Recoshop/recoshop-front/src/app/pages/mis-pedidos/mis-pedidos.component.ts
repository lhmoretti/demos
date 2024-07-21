import { Component, OnInit } from '@angular/core';
import { PedidosService } from 'src/app/services/pedidos.service';
import { Usuario } from 'src/app/models/usuarios.model';
import { Pedido } from 'src/app/models/pedido.model';
import { PaginationService } from 'src/app/services/pagination.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-mis-pedidos',
    templateUrl: './mis-pedidos.component.html',
    styleUrls: ['./mis-pedidos.component.css'],
})
export class MisPedidosComponent implements OnInit {
    Usuario: Usuario = {};
    arrPedidos: Pedido[] = [];
    Pedido: Pedido = {};

    subsPagina: Subscription;
    pagina = 0;

    constructor(
        private pedidoService: PedidosService,
        private pagination: PaginationService,
    ) {}

    ngOnInit(): void {
        this.Usuario = JSON.parse(localStorage.getItem('rs-user'));
        this.subsPagina = this.pagination.returnPage().subscribe((data) => {
            // console.log(data);
            this.pagina = data.pagina;
            this.getPedidos();
        });
        this.pagination.getPage();
    }

    getPedidos() {
        this.pedidoService
            .getPedidosByUserPaginados(
                this.Usuario.id,
                String(this.pagina),
                String(10),
            )
            .subscribe((data: any) => {
                // console.log(data);

                this.arrPedidos = data.pedidos;
            });
    }

    verPedido(pedido: Pedido) {
        this.Pedido = pedido;
    }
}
