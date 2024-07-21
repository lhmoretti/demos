import { Component, OnInit } from '@angular/core';
import { Productos } from 'src/app/models/Productos';
import { ProductosService } from 'src/app/services/productos.service';
import { AlertasService } from 'src/app/services/globales/alertas.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { PaginacionService } from 'src/app/services/globales/paginacion/paginacion.service';

@Component({
    selector: 'app-destacados',
    templateUrl: './destacados.component.html',
    styleUrls: ['./destacados.component.css'],
})
export class DestacadosComponent implements OnInit {
    arrProductos: Productos[] = [];
    showLoading: boolean;
    idComercio: number;
    idPrivilegio: number;

    constructor(
        private _productos: ProductosService,
        private _alert: AlertasService,
        private _auth: AuthService,
        private _pag: PaginacionService,
    ) {}

    async ngOnInit() {
        this.showLoading = true;
        this.idComercio = await this._auth.returnIdUsuario();
        this.idPrivilegio = await this._auth.returnRole();
        this.getPag();
    }

    destacado() {}

    getPag() {
        // !! FALTA HACER PAGINACION
        if (this.idPrivilegio == 1) {
            this.getDestacadosGeneral();
            // console.log('Admin, Obteniendo todos');
        } else if (this.idPrivilegio == 2) {
            this.getDestacadosComercio();
            // console.log('Vendedor, Obteniendo por Id');
        }
    }

    getDestacadosGeneral() {
        this.showLoading = true;
        this._productos.getDestacadosGeneral().subscribe(
            (data: Productos[]) => this.fillArray(data),
            (err) => {
                this._alert.toastError('', 'Error');
                console.log(err);
            },
        );
    }

    getDestacadosComercio() {
        this.showLoading = true;
        this._productos.getDestacadosComercio(this.idComercio).subscribe(
            (data: Productos[]) => this.fillArray(data),
            (err) => {
                this._alert.toastError('', 'Error');
                console.log(err);
            },
        );
    }

    fillArray(data) {
        this.arrProductos = [];
        if (data.length == 0) {
            this._alert.toastAlert('', 'No se encontraron productos');
            this.showLoading = false;
            return;
        }
        this.arrProductos = data;
        this.showLoading = false;
    }
}
