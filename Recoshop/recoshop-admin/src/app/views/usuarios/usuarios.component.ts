import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../services/usuarios.service';
import { Usuarios } from '../../models/Usuarios';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AlertasService } from 'src/app/services/globales/alertas.service';
import { PaginacionService } from 'src/app/services/globales/paginacion/paginacion.service';
import { Subscription } from 'rxjs';
import { ComerciosService } from 'src/app/services/comercios.service';

@Component({
    selector: 'app-usuarios',
    templateUrl: './usuarios.component.html',
    styleUrls: ['./usuarios.component.css'],
})
export class UsuariosComponent implements OnInit {
    size = 10;
    nro = 0;

    role = 3;
    attr = 'S';
    txt = '';

    arrUsuarios: Usuarios[] = [];
    showForm = false;
    formSubs: Subscription;
    correos: any[] = [];
    showListEmails = false;

    constructor(
        private _comercios: ComerciosService,
        private _pag: PaginacionService,
        private _alert: AlertasService,
        private _usuarios: UsuariosService,
        private _toastr: AlertasService,
    ) {
        this.formSubs = this._usuarios
            .obsForm()
            .subscribe((data: boolean) => (this.showForm = data));
    }

    ngOnInit() {
        this.getPag();
    }

    ngOnDestroy(): void {
        this.formSubs.unsubscribe();
    }

    pageChanged(event: { pageNro: number; pageSize: number }) {
        this.nro = event.pageNro;
        this.size = event.pageSize;
        this.getPag();
    }

    reset() {
        // reseteamos el nro de paginado
        this.showListEmails = false;
        this._pag.setPag(0);
        this.getPag();
    }

    getPag() {
        if (this.attr == 'S') {
            this.getPaginatedByRole();
        } else {
            this.getPaginatedByTxt();
        }
    }

    getPaginatedByRole(rol?: number) {
        if (this.nro < 0) {
            return;
        }
        /**
         *   si el rol que recibimos es null, significa que ya está asignado,
         *   de lo contrario lo asignamos
         */
        this._usuarios
            .getPaginatedByRole(this.size, this.nro, this.role)
            .subscribe(
                (data: Usuarios[]) => {
                    this.fillArray(data);
                },
                (err) => console.log(err),
            );
    }

    getPaginatedByTxt() {
        if (this.attr === 'S') {
            this._toastr.toastAlert('', 'Debe seleccionar un tipo de Filtro.');
            return;
        } else if (this.nro < 0) {
            return;
        }

        this._usuarios
            .getPaginatedByTxt(this.size, this.nro, this.attr, this.txt)
            .subscribe((data: Usuarios[]) => this.fillArray(data)),
            (err: any) => console.log(err);
    }

    nuevo() {
        this._usuarios.passUser(null); // Enviamos null para que resetee el form
        this._usuarios.hide(true);
    }

    volver() {
        this._usuarios.passUser(null); // Enviamos null para que resetee el form
        this._usuarios.hide(false);
    }

    passUser(user: Usuarios) {
        this._usuarios.passUser(user);
        this._usuarios.hide(true);
    }

    delete(id: number) {
        this._alert.sweetDelete().then((res) => {
            if (res) {
                this._usuarios.delete(id).subscribe(
                    () => {
                        this._alert.sweetSuccess('¡Eliminado con éxito!', '');
                        this.getPag();
                    },
                    (err) => {
                        this._alert.toastError('Intente nuevamente', 'Error');
                        console.error(err);
                    },
                );
            }
        });
    }

    fillArray(data: Usuarios[]) {
        this.arrUsuarios = [];
        if (data.length === 0) {
            this._pag.setBlockBtn(true);
        } else {
            this._pag.setBlockBtn(false);
            this.arrUsuarios = data;
        }
    }

    getCorreos() {
        this.showListEmails = true;
        if (this.correos.length == 0) {
            this._comercios.getCorreos().subscribe((data: any[]) => {
                this.correos = data;
                console.log(this.correos);
            }),
                (err: any) => console.log(err);
        }
    }
}
