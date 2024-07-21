import { Component, OnInit, OnDestroy } from '@angular/core';
import { PedidosService } from 'src/app/services/pedidos.service';
import { Pedido } from 'src/app/models/pedido.model';
import { MercadoPago } from 'src/app/models/mercadopago.model';
import { Items } from 'src/app/models/items.model';
import { MercadoPagoService } from 'src/app/services/mercado-pago.service';
import { __await } from 'tslib';

@Component({
    selector: 'app-checkout2',
    templateUrl: './checkout2.component.html',
    styleUrls: ['./checkout2.component.css'],
})
export class Checkout2Component implements OnInit, OnDestroy {
    arrIdsPedidos: any[] = [];
    arrPedidos: Pedido[] = [];

    constructor(
        private pedService: PedidosService,
        private mpService: MercadoPagoService,
    ) {}

    ngOnDestroy(): void {
        sessionStorage.removeItem('idsPedidos');
    }

    ngOnInit(): void {
        this.arrIdsPedidos = JSON.parse(sessionStorage.getItem('idsPedidos'));
        // console.log(this.arrIdsPedidos);
        this.getPedidos();
    }

    getPedidos() {
        for (const i of this.arrIdsPedidos) {
            this.pedService.getPedidosById(i).subscribe(
                (data: any) => {
                    this.arrPedidos.push(data);
                    this.genCheckOut();
                },
                (err) => {
                    console.log('Error: ', err);
                },
            );
        }
    }

    async genCheckOut() {
        // console.log();
        return new Promise(async (resolve) => {
            for (const pedido of this.arrPedidos) {
                // console.log(pedido);

                const mpBody: MercadoPago = {
                    payer: {
                        address: {},
                        phone: {},
                        identification: {},
                    },
                    items: [],
                };

                if (pedido.modo_pago == 'Mercado pago') {
                    mpBody.idComercio = pedido.comercioId.id;
                    mpBody.idPedido = pedido.id;
                    mpBody.payer.name = pedido.usuarioId.nombre;
                    mpBody.payer.surname = pedido.usuarioId.apellido;
                    mpBody.payer.email = pedido.usuarioId.email;
                    mpBody.payer.address.street_name =
                        pedido.usuarioId.domicilio;
                    mpBody.payer.phone.number = Number(
                        pedido.usuarioId.telefono,
                    );

                    for (const i of pedido.pedido_lineas) {
                        const item: Items = {};
                        item.id = i.id_prod;
                        item.quantity = i.cantidad;
                        item.title = i.nombre;
                        item.unit_price = i.oferta
                            ? i.precio_oferta
                            : i.precio_venta;
                        mpBody.items.push(item);
                    }
                    // console.log(mpBody);
                    this.mpService
                        .generarCheckout(mpBody)
                        .subscribe((resp: any) => {
                            // console.log(resp);
                            window.open(resp.response.body.init_point);
                        });
                }
            }
        });
    }
}
