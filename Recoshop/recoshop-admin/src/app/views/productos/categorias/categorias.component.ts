import { Component, OnInit } from '@angular/core';
import { CategoriasService } from 'src/app/services/categorias.service';
import { Categorias } from 'src/app/models/Categorias';
import { AlertasService } from 'src/app/services/globales/alertas.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ComerciosService } from 'src/app/services/comercios.service';
import { Comercios } from 'src/app/models/Comercios';
import { HttpEventType } from '@angular/common/http';

@Component({
    selector: 'app-categorias',
    templateUrl: './categorias.component.html',
    styleUrls: ['./categorias.component.css'],
})
export class CategoriasComponent implements OnInit {
    arrCategorias: Categorias[] = [];

    categoria: Categorias;
    showLoading: boolean;

    progreso = '';
    selectedFile: File = null;

    constructor(
        private _categorias: CategoriasService,
        private _alert: AlertasService,
        private _auth: AuthService,
        private _comercios: ComerciosService,
    ) {}

    async ngOnInit() {
        this.showLoading = true;
        // this.idUsuario = await this._auth.returnIdUsuario();
        // this.idPrivilegio = await this._auth.returnRole();
        this.getAll(); // <- categorias
    }

    delete(id: number) {
        this._alert.sweetDelete().then((res) => {
            if (res) {
                this._categorias.delete(id).subscribe(
                    () => {
                        this._alert.sweetSuccess('¡Eliminado con éxito!', '');
                        this.getAll();
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
        this._categorias.getAll(true).subscribe((data: Categorias[]) => {
            this.arrCategorias = data;
            this.showLoading = false;
        });
    }

    active(cat: Categorias) {
        this._categorias
            .update(cat)
            .toPromise()
            .then((res) => {
                this._alert.toastSuccess('', '¡Guardado con éxito!');
                this.getAll();
            })
            .catch((err) => {
                this._alert.toastError(
                    'Lo sentimos, vuelve a intentarlo',
                    'Error',
                );
                console.log(err);
            });
    }

    update() {
        this._categorias.update(this.categoria).subscribe(
            (data: Categorias) => {
                this._alert.toastSuccess('', '¡Actualizada con éxito!');
                this.getAll();
            },
            (err) => {
                this._alert.toastError('Intente nuevamente', 'Error');
                console.error(err);
            },
        );
    }

    passCat(cat: Categorias) {
        this.categoria = cat;
    }

    new() {
        const categoria = new Categorias();
        categoria.id = null;
        categoria.categoria = null;
        categoria.url_img = null;
        this.categoria = categoria;
    }

    resetDatosImg() {
        this.progreso = '';
        this.categoria.categoria = null;
        this.categoria.url_img = null;
    }

    onFileSelected(event) {
        this.selectedFile = event.target.files[0] as File;
        this.onUpload();
    }

    async onUpload() {
        if (
            this.categoria.categoria == '' ||
            this.categoria.categoria == null
        ) {
            return this._alert.toastError(
                'Complete el nombre de la categoría',
                '',
            );
        }

        const fd = new FormData();
        fd.append('file', this.selectedFile, this.selectedFile.name);
        fd.append('categoria', this.categoria.categoria);

        const token: string = await this._auth.returnToken();

        this._categorias.onUpload(fd, token).subscribe(
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
                    console.log(event);
                    if (event.status == 200) {
                        this._alert.toastSuccess(
                            '¡Categoría agregada con éxito!',
                            '',
                        );
                        this.resetDatosImg();
                        this.getAll();
                        document.getElementById('dismiss').click();
                    }
                }
            },
            (err) => {
                this._alert.toastError('Intente nuevamente', 'Error');
                console.log(err);
            },
        );
    }
}
