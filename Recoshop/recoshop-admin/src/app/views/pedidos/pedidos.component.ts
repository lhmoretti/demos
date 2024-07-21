import { Component, OnInit } from '@angular/core';
import { PedidosService } from 'src/app/services/pedidos.service';
import { Subscription } from 'rxjs';
import { Pedidos } from 'src/app/models/Pedidos';
import { AlertasService } from 'src/app/services/globales/alertas.service';
import { PaginacionService } from 'src/app/services/globales/paginacion/paginacion.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ComerciosService } from 'src/app/services/comercios.service';
import { Comercios } from 'src/app/models/Comercios';

@Component({
    selector: 'app-pedidos',
    templateUrl: './pedidos.component.html',
    styleUrls: ['./pedidos.component.css'],
})
export class PedidosComponent implements OnInit {
    hide: Subscription;
    size = 10;
    nro = 0;
    estado = 'P';

    arrPedidos: Pedidos[] = [];
    arrComercios: Comercios[] = [];
    showForm = false;

    idPrivilegio: number;
    idUsuario: number;
    idComercio: number;

    constructor(
        private _pedidos: PedidosService,
        private toastr: AlertasService,
        private _alert: AlertasService,
        private _pag: PaginacionService,
        private _auth: AuthService,
        private _comercios: ComerciosService,
    ) {}

    async ngOnInit() {
        this.idUsuario = await this._auth.returnIdUsuario();
        this.idPrivilegio = await this._auth.returnRole();
        // seleccion de gets, admin o vendedor:
        this.getComerciosByUsuario();
    }

    // Obtenemos los comercios, dependiendo si es el Admin o un vendedor
    getComerciosByUsuario() {
        if (this.idPrivilegio == 1) {
            // admin
            // buscamos TODOS los comercios Habilitados
            this._comercios.getComerciosHabilitados().subscribe(
                (data: Comercios[]) => {
                    if (data.length == 0) {
                        this._alert.toastAlert(
                            'Actualmente no hay comercios habilitados',
                            '',
                        );
                        return;
                    }
                    this.arrComercios = data;
                    this.idComercio = data[0].id; // asignamos el primer id de los comercios que encuentre
                    this.getPag();
                },
                (err) => {
                    this._alert.toastAlert(
                        'Lo sentimos, ocrurrió un error',
                        '',
                    );
                    console.log(err);
                },
            );
        } else {
            // vendedor
            // buscamos los comercios asociados al usuario
            this._comercios.getComerciosByIdUsuario(this.idUsuario).subscribe(
                (data: Comercios[]) => {
                    this.arrComercios = data;
                    this.idComercio = data[0].id; // asignamos el primer id de los comercios que encuentre
                    this.getPag();
                },
                (err) => {
                    this._alert.toastAlert(
                        'Lo sentimos, ocrurrió un error',
                        '',
                    );
                    console.log(err);
                },
            );
        }
    }

    // Se ejecuta cuando se cambia de comercio
    changeIdComercio() {
        this.reset();
    }

    changeEstado(ped: Pedidos, estado: string) {
        this._pedidos.changeEstado(ped, estado);
    }

    changeEstadoPagina(est: string) {
        this.estado = est;
        this.reset();
    }

    pageChanged(event: { pageNro: number; pageSize: number }) {
        this.nro = event.pageNro;
        this.size = event.pageSize;
        this.getPag();
    }

    reset() {
        this._pag.setPag(0);
        this.getPag();
    }

    getPag() {
        // si es admin..
        if (this.idPrivilegio == 1) {
            // si se selecciono un comercio, buscamos los productos del comercio por el id
            this.getByEstadoAndPag();
        }
        // si es vendedor..
        else if (this.idPrivilegio == 2) {
            this.getByEstadoAndComercioPag();
            // console.log('Vendedor, Obteniendo por Id');
        }
    }

    getByEstadoAndPag() {
        if (this.nro < 0) {
            return;
        }
        this._pedidos
            .getByEstadoAndPag(this.size, this.nro, this.estado)
            .subscribe(
                (data: Pedidos[]) => this.fillArray(data),
                (error) => console.log(error),
            );
    }

    getByEstadoAndComercioPag() {
        if (this.nro < 0) {
            return;
        }
        this._pedidos
            .getByEstadoAndComercioPag(
                this.size,
                this.nro,
                this.estado,
                this.idComercio,
            )
            .subscribe((data: Pedidos[]) => this.fillArray(data)),
            (err: any) => console.log(err);
    }

    fillArray(data: Pedidos[]) {
        this.arrPedidos = [];
        if (data.length === 0) {
            return;
        } else {
            this.arrPedidos = data;
        }
    }

    passArt(ped: Pedidos) {
        this._pedidos.sendPedido(ped);
        document.getElementById('verModal').click();
    }

    getDatos(refresh: boolean) {}
}
