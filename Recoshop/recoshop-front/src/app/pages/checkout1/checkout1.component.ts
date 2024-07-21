import { Component, OnInit, OnDestroy } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Subscription, Observable } from 'rxjs';
import { Lineas } from 'src/app/models/linea.model';
import { Pedido } from 'src/app/models/pedido.model';
import { Usuario } from 'src/app/models/usuarios.model';
import { ModosPagosService } from 'src/app/services/modos-pagos.service';
import { ModoPago } from 'src/app/models/modo_pago.model';
import { PedidosService } from 'src/app/services/pedidos.service';
import { Comercio } from 'src/app/models/comercio.model';
import { Router } from '@angular/router';
import { AlertsService } from 'src/app/services/alerts.service';
import { MailtransaccionalService } from 'src/app/services/mailtransaccional.service';
import { CorreoTransaccional } from 'src/app/models/correo.model';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { CanActivateGuard } from 'src/app/guards/can-activate.guard';
import { MercadoPagoService } from 'src/app/services/mercado-pago.service';

@Component({
    selector: 'app-checkout1',
    templateUrl: './checkout1.component.html',
    styleUrls: ['./checkout1.component.css'],
})
export class Checkout1Component implements OnInit, OnDestroy {
    arrLineas: Lineas[] = [];
    arrIdsComercio: any[] = [];
    arrArrayComercios: any[] = [];
    arrPedidos: Pedido[] = [];
    arrComerciosLineas: Comercio[] = [];

    arrIdsPedidos: any[] = [];

    loading = false;

    // Subscriptions
    cartSubscription: Subscription;
    userSubs: Subscription;

    Usuario: Usuario = {};
    Total = 0;

    // Opciones de envio
    // arrFormasEntrega:any[] = FormasEntrega;
    optDelivery = false;
    optRetSucursal = false;
    optAcuVendedor = true;
    FormaEntrega = 'Acuerdo con el vendedor';

    // Opciones de pagos
    optMpAcuVendedor = true;
    optMpMercadoPago = false;
    optMpCodigoQr = false;
    optMpTransBanc = false;
    optMpAbonoCont = false;
    ModoPago = 'Acuerdo con el vendedor';

    constructor(
        private cartService: CartService,
        private modoPagosService: ModosPagosService,
        private pedidosService: PedidosService,
        private mpService: MercadoPagoService,
        private router: Router,
        private canActivate: CanActivateGuard,
        private usuarioService: UsuariosService,
        private alertService: AlertsService,
        private mailService: MailtransaccionalService,
    ) {}

    ngOnDestroy(): void {
        this.limpiarCheckout();
    }

    ngOnInit(): void {
        this.cartSubscription = this.cartService
            .returnCart()
            .subscribe((data) => {
                this.arrLineas = data.lineas;
                this.Total = data.total;
            });

        this.Usuario = JSON.parse(localStorage.getItem('rs-user'));

        this.cartService.getCart();

        this.separarIds();
        this.comprobarUsuario();
    }

    async comprobarUsuario() {
        if (this.Usuario == {} || this.Usuario == null) {
            return null;
        }

        if (this.Usuario.domicilio == '' || this.Usuario.domicilio == null) {
            this.alertService.toastAlert(
                'Porfavor, completa tu domicilio antes de proseguir con la compra.',
                '',
            );
            this.router.navigate(['mi-cuenta']);
            return null;
        } else if (
            this.Usuario.telefono == '' ||
            this.Usuario.telefono == null
        ) {
            this.alertService.toastAlert(
                'Porfavor, completa tu teléfono antes de proseguir con la compra.',
                '',
            );
            this.router.navigate(['mi-cuenta']);
            return null;
        } else {
            this.obtenerUsuario();
        }
    }

    obtenerUsuario() {
        this.usuarioService
            .getUsuarioById(this.Usuario.id)
            .subscribe((data: any) => (this.Usuario = data));
    }

    separarIds() {
        let id = 0;
        this.arrLineas.sort((a, b) => a.comercioId.id - b.comercioId.id); // Hacemos sort para ordenar de menor idcomercio a mayor para for.

        for (let i = 0; i < this.arrLineas.length; i++) {
            // console.log(this.arrLineas[i].comercioId.id);

            id = i > 0 ? this.arrLineas[i - 1].comercioId.id : null; // seteamos el id Anterior al actual.

            if (id != this.arrLineas[i].comercioId.id) {
                // Comprobamos si el id anterior es igual al actual
                this.arrIdsComercio.push(this.arrLineas[i].comercioId.id);
                this.arrComerciosLineas.push(this.arrLineas[i].comercioId);
            }
        }
        this.crearLineasComercios();
    }

    crearLineasComercios() {
        for (let i = 0; i < this.arrIdsComercio.length; i++) {
            this.arrLineas.find((linea: any) => {
                if (linea.comercioId.id == this.arrIdsComercio[i]) {
                    const local = localStorage.getItem(
                        `lineasComercio${this.arrIdsComercio[i]}`,
                    );

                    if (local == 'null' || local == null) {
                        const arr: any[] = [];
                        arr.push(linea);
                        localStorage.setItem(
                            'lineasComercio' + this.arrIdsComercio[i],
                            JSON.stringify(arr),
                        );
                    } else {
                        const lineas = JSON.parse(
                            localStorage.getItem(
                                `lineasComercio${this.arrIdsComercio[i]}`,
                            ),
                        );
                        let arr: any[] = [];
                        arr = lineas;
                        const enco = arr.find(
                            (e) => e.id_prod == linea.id_prod,
                        );
                        if (!enco) {
                            arr.push(linea);
                        } else {
                            enco.cantidad = linea.cantidad;
                        }
                        localStorage.setItem(
                            `lineasComercio${this.arrIdsComercio[i]}`,
                            JSON.stringify(arr),
                        );
                    }
                }
            });
        }
        this.crearPedidosComercios();
        // this.activoEnvio();
    }

    crearPedidosComercios() {
        let total = 0;
        for (let i = 0; i < this.arrIdsComercio.length; i++) {
            // Recorremos los ids de pedidos
            const pedido: Pedido = {};

            const lineas = JSON.parse(
                localStorage.getItem(`lineasComercio${this.arrIdsComercio[i]}`),
            );

            for (const i of lineas) {
                if (i.unidad == 100) {
                    if (i.oferta == true) {
                        total += i.precio_oferta * (i.cantidad / 1000);
                    } else {
                        total += i.precio_venta * (i.cantidad / 1000);
                    }
                } else if (i.unidad == 1) {
                    if (i.oferta == true) {
                        total += i.precio_oferta * i.cantidad;
                    } else {
                        total += i.precio_venta * i.cantidad;
                    }
                }
                // console.log(total);
            }

            if (this.arrComerciosLineas[i].id == this.arrIdsComercio[i]) {
                pedido.comercioId = this.arrComerciosLineas[i];
            }

            pedido.pedido_lineas = lineas;
            pedido.usuarioId = this.Usuario;

            pedido.estado = 'P';
            pedido.fecha_hora = new Date();
            pedido.total = total;
            total = 0;

            this.arrPedidos.push(pedido);
            localStorage.removeItem('pedidos');
            localStorage.setItem('pedidos', JSON.stringify(this.arrPedidos));
            localStorage.setItem(
                `pedidoComercio${this.arrIdsComercio[i]}`,
                JSON.stringify(pedido),
            );
        }
    }

    limpiarCheckout() {
        for (let i = 0; i < this.arrIdsComercio.length; i++) {
            localStorage.removeItem(`lineasComercio${this.arrIdsComercio[i]}`);
            localStorage.removeItem(`pedidoComercio${this.arrIdsComercio[i]}`);
        }
    }

    // Funcion para seleccionar la forma de entrega.
    selectEnvio(opt, fe) {
        if (opt == 'D') {
            this.optDelivery = true;
            this.optRetSucursal = false;
            this.optAcuVendedor = false;
        } else if (opt == 'A') {
            this.optDelivery = false;
            this.optRetSucursal = false;
            this.optAcuVendedor = true;
        } else if (opt == 'R') {
            this.optDelivery = false;
            this.optRetSucursal = true;
            this.optAcuVendedor = false;
        }
        this.FormaEntrega = fe;
    }

    // Funcion selecciona el pago y lo adjunta al pedido
    selectPago(opt, mp) {
        if (opt == 'MP') {
            this.optMpMercadoPago = true;
            this.optMpCodigoQr = false;
            this.optMpAcuVendedor = false;
            this.optMpAbonoCont = false;
            this.optMpTransBanc = false;
        } else if (opt == 'A') {
            this.optMpAcuVendedor = true;
            this.optMpCodigoQr = false;
            this.optMpMercadoPago = false;
            this.optMpAbonoCont = false;
            this.optMpTransBanc = false;
        } else if (opt == 'QR') {
            this.optMpAcuVendedor = false;
            this.optMpCodigoQr = true;
            this.optMpMercadoPago = false;
            this.optMpAbonoCont = false;
            this.optMpTransBanc = false;
        } else if (opt == 'TB') {
            this.optMpAcuVendedor = false;
            this.optMpCodigoQr = false;
            this.optMpMercadoPago = false;
            this.optMpAbonoCont = false;
            this.optMpTransBanc = true;
        } else if (opt == 'AC') {
            this.optMpAcuVendedor = false;
            this.optMpCodigoQr = false;
            this.optMpAbonoCont = true;
            this.optMpTransBanc = false;
            this.optMpMercadoPago = false;
        }

        this.ModoPago = mp;
    }

    limpiarPedido(pedido) {
        const indIds = this.arrIdsComercio.indexOf(pedido.comercioId.id);
        const indPed = this.arrPedidos.indexOf(pedido);

        for (let i = 0; i < this.arrLineas.length; i++) {
            for (let j = 0; j < pedido.pedido_lineas.length; j++) {
                if (
                    pedido.pedido_lineas[j].comercioId ==
                    this.arrLineas[i].comercioId.id
                ) {
                    this.arrLineas.splice(i, 1);
                }
            }
            // console.log(this.arrLineas);
        }

        localStorage.removeItem('lineas');
        localStorage.setItem('lineas', JSON.stringify(this.arrLineas));

        this.arrIdsComercio.splice(indIds, 1);
        this.arrPedidos.splice(indPed, 1);

        localStorage.removeItem(`lineasComercio${pedido.comercioId.id}`);
        localStorage.removeItem(`pedidoComercio${pedido.comercioId.id}`);
        localStorage.setItem('pedidos', JSON.stringify(this.arrPedidos));
        // this.separarIds();
    }

    async confirmarPedido(pedido: Pedido) {
        this.loading = true;

        for (let i = 0; i < pedido.pedido_lineas.length; i++) {
            pedido.pedido_lineas[i].comercioId =
                pedido.pedido_lineas[i].comercioId.id;
        }

        // console.log(this.ModoPago);
        pedido.modo_pago = this.ModoPago;
        pedido.modo_entrega = this.FormaEntrega;
        // console.log(pedido);
        this.pedidosService.post(pedido).subscribe(async (pedidoBD: Pedido) => {
            this.arrIdsPedidos.push(pedidoBD.id);
            sessionStorage.setItem(
                'idsPedidos',
                JSON.stringify(this.arrIdsPedidos),
            );
            // console.log(data);
            const respMC = await this.enviarMailsComercio(pedido);
            const respMU = await this.enviarMailUsuario(pedido);

            if (respMU && respMC) {
                this.limpiarPedido(pedido);
                this.loading = false;
                this.alertService.alertSuccess(
                    '¡Excelente!',
                    `Tu pedido de ${pedido.comercioId.nombre} esta siendo procesado`,
                );
                if (this.arrPedidos.length == 0) {
                    this.router.navigate(['checkout2']);
                    localStorage.removeItem('lineas');
                    this.arrLineas = [];
                    return null;
                }
            }
        });
    }

    enviarMailUsuario(pedido: Pedido) {
        return new Promise((resolve) => {
            const bodyMail: CorreoTransaccional = {};
            bodyMail.correo = pedido.usuarioId.email;
            bodyMail.role = 'PU';
            bodyMail.pedido = pedido;
            bodyMail.nombre = '';
            this.mailService
                .postMail(bodyMail)
                .toPromise()
                .then((data) => {
                    resolve(true);
                })
                .catch((err) => {
                    console.log(err);
                });
        });
    }

    enviarMailsComercio(pedido: Pedido) {
        return new Promise((resolve) => {
            const bodyMail: CorreoTransaccional = {};
            bodyMail.correo = pedido.comercioId.email;
            bodyMail.role = 'PC';
            bodyMail.pedido = pedido;
            bodyMail.nombre = '';
            this.mailService
                .postMail(bodyMail)
                .toPromise()
                .then((data) => {
                    resolve(true);
                })
                .catch((err) => {
                    console.log(err);
                });
        });
    }
}
