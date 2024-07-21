import { Component, OnInit } from '@angular/core';
import { Marcas, MarcasForm } from 'src/app/models/Marcas';
import { MarcasService } from 'src/app/services/marcas.service';
import { AlertasService } from 'src/app/services/globales/alertas.service';
import { CategoriasService } from 'src/app/services/categorias.service';
import { Categorias } from 'src/app/models/Categorias';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Comercios } from 'src/app/models/Comercios';
import { ComerciosService } from 'src/app/services/comercios.service';

@Component({
    selector: 'app-marcas',
    templateUrl: './marcas.component.html',
    styleUrls: ['./marcas.component.css'],
})
export class MarcasComponent implements OnInit {
    arrMarcas: Marcas[] = [];
    arrComercios: Comercios[] = [];
    marca = this.cf.MarcasForm;
    showLoading: boolean;
    idComercio: number;
    idUsuario: number;
    idPrivilegio: number;

    constructor(
        private _marcas: MarcasService,
        private _alert: AlertasService,
        private cf: MarcasForm,
        private _auth: AuthService,
        private _comercios: ComerciosService,
    ) {}

    async ngOnInit() {
        this.idUsuario = await this._auth.returnIdUsuario();
        this.idPrivilegio = await this._auth.returnRole();
        // 1ero obtenemos los comercios, luego con
        // cada id de comercio obtenemos las marcas
        this.getComerciosByUsuario();
    }

    send() {
        const id = this.marca.get('id').value;
        id === null ? this.post() : this.update();
    }

    post() {
        this._marcas.post(this.marca.value).subscribe(
            (data: Marcas) => {
                this._alert.toastSuccess('', '¡Agregado con éxito!');
                this.getByPrivilegio();
                this.new();
            },
            (err) => {
                this._alert.toastError('Ha ocurrido un error.', '');
                console.log(err);
            },
        );
    }

    delete(id: number) {
        this._alert.sweetDelete().then((res) => {
            if (res) {
                this._marcas.delete(id).subscribe(
                    () => {
                        this._alert.sweetSuccess('¡Eliminado con éxito!', '');
                        this.getByPrivilegio();
                    },
                    (err) => {
                        this._alert.toastError('Intente nuevamente', 'Error');
                        console.error(err);
                    },
                );
            }
        });
    }

    getAll() {
        this._marcas.getAll(true).subscribe(
            (data: Marcas[]) => {
                this.arrMarcas = data;
                this.showLoading = false;
            },
            (err) => {
                console.log('Error', err);
            },
        );
    }

    update() {
        this._marcas.update(this.marca.value).subscribe((data: Marcas) => {
            this._alert.toastSuccess('', '¡Actualizado con éxito!');
            this.getByPrivilegio();
        });
    }

    passObj(tal: Marcas) {
        this.marca.setValue(tal);
    }

    new() {
        console.log('this.idComercio', this.idComercio);
        // this.marca.reset();

        this.marca.controls.comercioId.setValue(this.arrComercios[0]);
        this.marca.controls.marca.setValue(null);
        console.log('this.idComercio', this.idComercio);

        // this.asignarComercioId();
    }

    getByPrivilegio() {
        if (this.idPrivilegio == 1) {
            // this.getPaginated(); console.log('Admin, Obteniendo todos');
            this.getAll();
            // console.log('Admin, Obteniendo todos');
        } else {
            // this.getPaginatedByComercio(); console.log('Vendedor, Obteniendo por Id');
            this.getByComercio();
            // console.log('Vendedor, Obteniendo por Id');
        }
    }

    // Obtener marcas por id de comercio
    getByComercio() {
        this._marcas.getByComercio(this.idComercio).subscribe(
            (data: Marcas[]) => {
                this.arrMarcas = data;
                this.showLoading = false;
            },
            (err) => {
                console.log('Error', err);
            },
        );
    }

    // Obtenemos los comercios, dependiendo si es el Admin o un vendedor
    getComerciosByUsuario() {
        if (this.idPrivilegio == 1) {
            // admin
            // buscamos TODOS los comercios Habilitados
            this._comercios.getComerciosHabilitados().subscribe(
                (data: Comercios[]) => this.checkComercios(data),
                (err) => {
                    this._alert.toastAlert(
                        'Actualmente no tienes comercios adheridos',
                        '',
                    );
                    console.log(err);
                },
            );
        } else {
            // vendedor
            // buscamos los comercios asociados al usuario
            this._comercios.getComerciosByIdUsuario(this.idUsuario).subscribe(
                (data: Comercios[]) => this.checkComercios(data),
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

    checkComercios(data: Comercios[]) {
        if (data.length == 0) {
            this._alert.toastAlert(
                'Actualmente no hay comercios habilitados',
                '',
            );
            return;
        }
        this.arrComercios = data;
        // asignamos el primer id de los comercios que encuentre
        this.idComercio = data[0].id;
        this.getByPrivilegio();
    }

    asignarComercioId() {
        this.marca.controls.comercioId.setValue(this.idComercio);
    }

    compareComercio(c1: any, c2: any): boolean {
        return c1 && c2 ? c1.id === c2.id : c1 === c2;
    }
}
