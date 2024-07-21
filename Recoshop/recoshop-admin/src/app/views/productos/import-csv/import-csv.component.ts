import { Component, OnInit } from '@angular/core';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { AlertasService } from 'src/app/services/globales/alertas.service';
import { HttpEventType } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Observable } from 'rxjs';
import { Comercios } from 'src/app/models/Comercios';
import { ComerciosService } from 'src/app/services/comercios.service';
import { tap } from 'rxjs/operators';
import { Categorias } from 'src/app/models/Categorias';
import { Marcas } from 'src/app/models/Marcas';
import { MarcasService } from 'src/app/services/marcas.service';
import { CategoriasService } from 'src/app/services/categorias.service';
import { Productos } from 'src/app/models/Productos';
import { ProductosService } from 'src/app/services/productos.service';

@Component({
    selector: 'app-import-csv',
    templateUrl: './import-csv.component.html',
    styleUrls: ['./import-csv.component.css'],
})
export class ImportCsvComponent implements OnInit {
    sFile: File;
    idUsuario: number;
    idPrivilegio: number;
    idComercio: number;
    progreso = '';
    marcas: Marcas[] = [];
    categorias: Categorias[] = [];
    comercios$: Observable<Comercios[]>;
    productos: any[] = [];
    showLoading = false;

    constructor(
        private _auth: AuthService,
        private _comercios: ComerciosService,
        private _prods: ProductosService,
        private _fu: FileUploadService,
        private _alert: AlertasService,
        private _marcas: MarcasService,
        private _categorias: CategoriasService,
    ) {}

    async ngOnInit() {
        this.idUsuario = await this._auth.returnIdUsuario();
        this.idPrivilegio = await this._auth.returnRole();
        this.getComerciosByUsuario();
    }

    // Obtenemos los comercios, dependiendo si es el Admin o un vendedor
    getComerciosByUsuario() {
        if (this.idPrivilegio == 1) {
            // admin
            // buscamos TODOS los comercios Habilitados
            this.comercios$ = this._comercios
                .getComerciosHabilitados()
                .pipe(tap((data: Comercios[]) => this.checkComercios(data)));
        } else {
            // vendedor
            // buscamos los comercios asociados al usuario
            this.comercios$ = this._comercios
                .getComerciosByIdUsuario(this.idUsuario)
                .pipe(tap((data: Comercios[]) => this.checkComercios(data)));
        }
    }

    compareMarcas(c1: any, c2: any): boolean {
        return c1 && c2 ? c1.id === c2.id : c1 === c2;
    }

    compareCategorias(c1: any, c2: any): boolean {
        return c1 && c2 ? c1.id === c2.id : c1 === c2;
    }

    getDatos() {
        this.getCategorias();
        this.getMarcas();
    }

    getCategorias(refresh?: boolean) {
        this._categorias
            .getAll(refresh)
            .pipe(tap((data: Categorias[]) => this.checkCategorias(data)))
            .subscribe();
    }

    getMarcas() {
        if (this.idPrivilegio == 1) {
            // Admin..
            this._marcas
                .getAll(true)
                .pipe(tap((data: Marcas[]) => this.checkMarcas(data)))
                .subscribe();
        } else if (this.idPrivilegio == 2) {
            // vendedor
            this._marcas
                .getByComercio(this.idComercio)
                .pipe(tap((data: Marcas[]) => this.checkMarcas(data)))
                .subscribe();
        }
    }

    checkMarcas(data: Marcas[]) {
        console.log('Marcas', data);
        if (data.length == 0) {
            return this._alert.toastAlert(
                'Actualmente no tienes marcas cargadas',
                '',
            );
        }
        this.marcas = data;
    }

    checkCategorias(data: Categorias[]) {
        console.log('Categorias', data);
        if (data.length == 0) {
            return this._alert.toastAlert(
                'Actualmente no hay categorías cargadas',
                '',
            );
        }
        this.categorias = data;
    }

    checkComercios(data: Comercios[]) {
        if (data.length == 0) {
            return this._alert.toastAlert(
                'Actualmente no hay comercios habilitados',
                '',
            );
        }
        this.idComercio = data[0].id;
        this.getDatos();
    }

    compareComercio(c1: any, c2: any): boolean {
        return c1 && c2 ? c1.id === c2.id : c1 === c2;
    }

    async onUpload(event) {
        this.sFile = event.target.files[0] as File;
        const fd = new FormData();
        fd.append('file', this.sFile, this.sFile.name);

        this._fu.onUploadCsv(fd, this.idComercio).subscribe(
            (event) => {
                if (event.type === HttpEventType.UploadProgress) {
                    // seguimiento del progreso
                    console.log(
                        'Progreso:' +
                            Math.round((event.loaded / event.total) * 100) +
                            '%',
                    );
                    this.progreso =
                        'Progreso:' +
                        Math.round((event.loaded / event.total) * 100) +
                        '%';
                } else if (event.type === HttpEventType.Response) {
                    if (event.status == 200) {
                        this.productos = event.body;
                        this._alert.toastSuccess(
                            '¡Archivo agregado con éxito!',
                            '',
                        );
                        this.asignarIdComercio();
                    }
                }
            },
            (err) => {
                this._alert.toastError('Intente nuevamente', 'Error');
                console.log(err);
            },
        );
    }

    asignarIdComercio() {
        setTimeout(() => {
            this.productos.forEach((e) => {
                e.push(this.idComercio);
            });
        });
    }

    clean() {
        this.productos = [];
    }

    post() {
        this.showLoading = true;
        const p = { productos: this.productos };
        console.log('this.productos', this.productos);

        this._fu.postCsv(p).subscribe(
            (data) => {
                this.showLoading = false;
                this.clean();
                this._alert.toastSuccess(
                    '¡Importación de productos realizada con éxito!',
                    '',
                );
            },
            (err) => {
                console.log('Error', err);
                this.showLoading = false;
                this._alert.toastError('Intente nuevamente', 'Error');
            },
        );
    }
}
