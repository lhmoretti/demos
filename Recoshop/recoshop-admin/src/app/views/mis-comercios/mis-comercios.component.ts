import { Component, OnInit } from '@angular/core';
import { ComerciosService } from 'src/app/services/comercios.service';
import { Comercios } from 'src/app/models/Comercios';
import { AuthService } from 'src/app/services/auth/auth.service';
import { AlertasService } from 'src/app/services/globales/alertas.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { ProductosService } from 'src/app/services/productos.service';
import { Productos } from 'src/app/models/Productos';
import { HttpEventType, HttpParams, HttpClient } from '@angular/common/http';
import { Endpoint } from 'src/app/endpoint';
import { UtilProductService } from 'src/app/utils/products';

@Component({
    selector: 'app-mis-comercios',
    templateUrl: './mis-comercios.component.html',
    styleUrls: ['./mis-comercios.component.css'],
})
export class MisComerciosComponent implements OnInit {
    public UrlRest: string = Endpoint.UrlRest;

    progreso = '';
    selectedFile: File = null;
    nombreFoto = '';

    showTienda = false;
    showLoading = false;

    arrComercios: Comercios[] = [];
    arrProductos: Productos[] = [];
    usuarioId: number;
    comercio: Comercios;

    idPrivilegio: number;
    idUsuario: number;
    idComercio: number;

    constructor(
        private http: HttpClient,
        private _utilProduct: UtilProductService,
        private _productos: ProductosService,
        private _comercios: ComerciosService,
        private _auth: AuthService,
        private _alert: AlertasService,
        private _usuarios: UsuariosService,
    ) {}

    async ngOnInit() {
        this.idUsuario = await this._auth.returnIdUsuario();
        this.idPrivilegio = await this._auth.returnRole();
        this.getComerciosByUsuario();
    }

    passCom(com: Comercios) {
        delete com.created_at;
        delete com.updated_at;

        this._comercios.passCom(com);
        this._comercios.hide(true);
    }

    getComerciosByUsuario() {
        this._comercios.getComerciosByIdUsuario(this.idUsuario).subscribe(
            (data: Comercios[]) => {
                if (data.length > 0) {
                    this.idComercio = data[0].id; // asignamos el primer id de los comercios que encuentre
                    this.arrComercios = data;
                }
            },
            (err) => {
                this._alert.toastAlert('Lo sentimos, ocrurrió un error', '');
                console.log(err);
            },
        );
    }

    getDatos(idComercio: number) {
        this.idComercio = idComercio;
        this._comercios.get(idComercio).subscribe(
            (data: Comercios) => {
                this.comercio = data;
                this.showTienda = true;
            },
            (err) => {
                this._alert.toastAlert('Lo sentimos, ocrurrió un error', '');
                console.log(err);
            },
        );

        this.getAllByComercio(idComercio);
    }

    getAllByComercio(idComercio) {
        this._productos.getAllByComercio(idComercio).subscribe(
            (data: Productos[]) => (this.arrProductos = data),
            (err) => {
                this._alert.toastAlert('Lo sentimos, ocrurrió un error', '');
                console.log(err);
            },
        );
    }

    // ===========================
    resetDatosImg() {
        this.progreso = '';
        this.selectedFile = null;
        this.nombreFoto = '';
    }

    onFileSelected(event, at: number) {
        this.selectedFile = event.target.files[0] as File;
        this.nombreFoto = this.selectedFile.name;
        // if (this.nombreFoto == '') { this.btnImg = false; } else { this.btnImg = true; }
        this.onUpload(at);
    }

    async onUpload(at?: number) {
        // at = 1 o 2, para diferenciar si es avatar(1) o banner(2)
        let attr: string;
        at == 1 ? (attr = 'avatar') : (attr = 'banner');

        const fd = new FormData();
        fd.append('file', this.selectedFile, this.selectedFile.name);

        const token: string = await this._auth.returnToken();
        const params = new HttpParams().set(
            'idCom',
            this.idComercio.toString(),
        );

        this.http
            .post(`${this.UrlRest}/comercio/${attr}`, fd, {
                params,
                // headers: new HttpHeaders({ 'Authorization': token }),
                reportProgress: true,
                observe: 'events',
            })
            .subscribe(
                (event) => {
                    if (event.type === HttpEventType.UploadProgress) {
                        // seguimiento del progreso
                        console.log(
                            'Progreso:' +
                                Math.round((event.loaded / event.total) * 100) +
                                '%',
                        );
                        this.progreso =
                            Math.round((event.loaded / event.total) * 100) +
                            '%';
                    } else if (event.type === HttpEventType.Response) {
                        console.log(event);
                        if (event.status == 200) {
                            this.getDatos(this.idComercio);

                            this._alert.toastSuccess(
                                'Imagen agregada con éxito!',
                                '',
                            );
                        }
                    }
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

    async archivar(producto: Productos) {
        const resp = await this._utilProduct.archivar(producto);
        this.getAllByComercio(this.idComercio);
    }
}
