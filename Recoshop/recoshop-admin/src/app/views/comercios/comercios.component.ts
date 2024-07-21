import { Component, OnInit } from '@angular/core';
import { ComerciosService } from '../../services/comercios.service';
import { Comercios } from '../../models/Comercios';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AlertasService } from 'src/app/services/globales/alertas.service';
import { PaginacionService } from 'src/app/services/globales/paginacion/paginacion.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-comercios',
    templateUrl: './comercios.component.html',
    styleUrls: ['./comercios.component.css'],
})
export class ComerciosComponent implements OnInit {
    size = 10;
    nro = 0;
    txt = '';
    attr = 'S';
    role = 2; // rol comercio = 2

    arrComercios: Comercios[] = [];
    showForm = false;
    formSubs: Subscription;

    constructor(
        private _pag: PaginacionService,
        private _alert: AlertasService,
        private _comercios: ComerciosService,
        private _toastr: AlertasService,
    ) {
        this.formSubs = this._comercios
            .obsForm()
            .subscribe((data: boolean) => (this.showForm = data));
    }

    ngOnInit() {}

    ngOnDestroy(): void {
        this.formSubs.unsubscribe();
    }

    nuevo() {
        this._comercios.passCom(null); // Enviamos null para que resetee el form
        this._comercios.hide(true);
    }

    volver() {
        this._comercios.passCom(null); // Enviamos null para que resetee el form
        this._comercios.hide(false);
    }

    passCom(com: Comercios) {
        delete com.created_at;
        delete com.updated_at;

        this._comercios.passCom(com);
        this._comercios.hide(true);
    }

    getComercios() {
        this.role = 2;

        if (this.attr === 'hab') {
            this.getComerciosHabilitados();
        } else if (this.attr === 'inhab') {
            this.getComerciosInhabilitados();
        }
    }

    delete(id: number) {
        this._alert.sweetDelete().then((res) => {
            if (res) {
                this._comercios.delete(id).subscribe(
                    () => {
                        this._alert.sweetSuccess('¡Eliminado con éxito!', '');
                        this.getComercios();
                    },
                    (err) => {
                        this._alert.toastError('Intente nuevamente', 'Error');
                        console.error(err);
                    },
                );
            }
        });
    }

    changeEstado(a: boolean, id: number) {
        if (a === true) {
            this._comercios.deshablitar(id).subscribe(
                () => {
                    this._alert.sweetSuccess('', '¡Modificado correctamente!');
                    this.getComercios();
                },
                (err) => {
                    this._alert.toastError(
                        'Lo sentimos, intente nuevamente',
                        'Error',
                    );
                    console.log(err);
                },
            );
        } else if (a === false) {
            this._comercios.hablitar(id).subscribe(
                () => {
                    this._alert.sweetSuccess('', '¡Modificado correctamente!');
                    this.getComercios();
                },
                (err) => {
                    this._alert.toastError(
                        'Lo sentimos, intente nuevamente',
                        'Error',
                    );
                    console.log(err);
                },
            );
        }
    }

    fillArray(data: Comercios[] | any) {
        this.arrComercios = [];
        if (data.length === 0) {
            this._pag.setBlockBtn(true);
        } else {
            this._pag.setBlockBtn(false);
            this.arrComercios = Array.isArray(data) ? data : data?.comercios;
        }
    }

    pageChanged(event: { pageNro: number; pageSize: number }) {
        this.nro = event.pageNro;
        this.size = event.pageSize;
        this.getPag();
    }

    reset() {
        // reseteamos el nro de paginado
        this._pag.setPag(0);
        this.getPag();
    }

    getPag() {
        if (this.attr == 'S') {
            this.getPaginated();
        } else {
            this.getPaginatedByTxt();
        }
    }

    getPaginated() {
        if (this.nro < 0) {
            return;
        }

        this._comercios.getPaginated(this.size, this.nro).subscribe(
            (data: Comercios[]) => this.fillArray(data),
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

        this._comercios
            .getPaginatedByTxt(this.size, this.nro, this.attr, this.txt)
            .subscribe((data: Comercios[]) => {
                console.log(data);
                this.fillArray(data);
            }),
            (err: any) => console.log(err);
    }

    getComerciosInhabilitados() {
        this._comercios.getComerciosInhabilitados().subscribe(
            (data: Comercios[]) => {
                this.arrComercios = data;
            },
            (err) => {
                this._alert.toastError('Intente nuevamente', 'Error');
                console.error(err);
            },
        );
    }

    getComerciosHabilitados() {
        this._comercios.getComerciosHabilitados().subscribe(
            (data: Comercios[]) => {
                console.log(data);

                this.arrComercios = data;
            },
            (err) => {
                this._alert.toastError('Intente nuevamente', 'Error');
                console.error(err);
            },
        );
    }
}
