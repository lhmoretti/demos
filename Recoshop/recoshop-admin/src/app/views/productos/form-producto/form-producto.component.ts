import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { ProductosService } from 'src/app/services/productos.service';
import { Productos } from 'src/app/models/Productos';
import { Categorias } from 'src/app/models/Categorias';
import { Marcas } from 'src/app/models/Marcas';
import { MarcasService } from 'src/app/services/marcas.service';
import { CategoriasService } from 'src/app/services/categorias.service';
import { AlertasService } from 'src/app/services/globales/alertas.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { HttpEventType } from '@angular/common/http';
import { Endpoint } from 'src/app/endpoint';
import { Comercios } from 'src/app/models/Comercios';
import { ComerciosService } from 'src/app/services/comercios.service';
import { tap } from 'rxjs/operators';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { EditorConfig } from './kolkov';
import { UtilProductService } from 'src/app/utils/products';

@Component({
    selector: 'app-form-producto',
    templateUrl: './form-producto.component.html',
    styleUrls: ['./form-producto.component.css'],
})
export class FormArticuloComponent implements OnInit, OnDestroy, AfterViewInit {
    constructor(
        private _auth: AuthService,
        private _productos: ProductosService,
        private _utilProducto: UtilProductService,
        private _marcas: MarcasService,
        private _categorias: CategoriasService,
        private _alert: AlertasService,
        private _comercios: ComerciosService,
        private _fu: FileUploadService,
    ) {
        this.artSubs = this._productos
            .obsArt()
            .subscribe(async (data: Productos) => {
                this.blockConfirm = false; // habilitamos el btn guardar producto al ingresar al form
                this.idUsuario = await this._auth.returnIdUsuario();
                this.idPrivilegio = await this._auth.returnRole();

                if (!data) {
                    return;
                } // si no llega nada retornamos
                if (data.id == null) {
                    // si el id es null, significa nuevo producto. Asignamos y retornamos.
                    this.ProductosForm = data;
                    this.checkTipoVenta();
                    this.getComerciosByUsuario();
                    return;
                }
                this.ProductosForm = data;
                this.ProductosForm
                    ? (this.showForm = true)
                    : (this.showForm = false);
                // console.log('EDIT ProductosForm', this.ProductosForm);

                this.checkTipoVenta();
                this.getComerciosByUsuario();
                this.checkImagenes();
            });

        this.formSubs = this._productos
            .obsForm()
            .subscribe((data: any) => (this.showForm = data));
    }
    public UrlRest: string = Endpoint.UrlRest;
    blockCargaImgs: boolean;
    blockConfirm: boolean;

    progreso = '';
    btnImg: boolean;

    showForm = false;
    showLoading: boolean;
    showPermiteCompra: boolean;
    showPermiteConsulta: boolean;

    ProductosForm: Productos;

    artSubs: Subscription;
    formSubs: Subscription;

    idUsuario: number;
    idPrivilegio: number;
    idComercio: number;

    comercios$: Observable<Comercios[]>;
    categorias$: Observable<Categorias[]>;
    marcas$: Observable<Marcas[]>;

    editorConfig: AngularEditorConfig = EditorConfig.editorConfig;

    imageChangedEvent: any = '';
    croppedImage: any = '';

    ngOnInit() {}

    ngAfterViewInit(): void {}

    ngOnDestroy(): void {
        this.artSubs.unsubscribe();
        this.formSubs.unsubscribe();
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

    // send() = comprueba el id del json del producto a enviar,
    // si el id es nulo, llama a post, sino es un update del producto
    async send() {
        // primero obtenemos el id del comercio para asignarselo al producto:
        // let id: number = await this._auth.returnIdUsuario();

        // validamos los datos del producto:
        this.checkData()
            .then((val: boolean) => {
                if (val) {
                    this.ProductosForm.id === null
                        ? this.post()
                        : this.update();
                } else {
                    this._alert.toastError(
                        'Complete los campos necesarios.',
                        'Error',
                    );
                }
            })
            .catch((err) => {
                console.log('Error', err);
            });
    }

    post() {
        this._productos.post(this.ProductosForm).subscribe(
            (prod: Productos) => {
                this._alert.toastSuccess('¡Producto agregado con éxito!', '');
                // this._productos.hide(false);
                this.ProductosForm.id = prod.id;
                // this.cargarImagen();
            },
            (err) => {
                this._alert.toastAlert('Lo sentimos, ocrurrió un error', '');
                console.log(err);
            },
        );
    }

    update() {
        const art: Productos = this.ProductosForm;
        this._productos.update(art).subscribe(
            () => {
                this._alert.toastSuccess(
                    '¡Producto actualizado con éxito!',
                    '',
                );
                // this._productos.hide(false);  // Una vez actualizado volvemos a la pag de productos
                this.get(art.id); // hacemos get del producto actualizado
                // this.checkImagenes(); // chequeamos cantidad de imagenes cargadas
            },
            (err) => {
                this._alert.toastError(
                    'Lo sentimos, ha ocurrido un error',
                    'Error',
                );
                console.log('Error:', err);
            },
        );
    }

    get(idProducto: number) {
        this._productos.get(idProducto).subscribe(
            (data: Productos) => {
                this.ProductosForm = data;
                this.checkImagenes();
            },
            (err) => {
                this._alert.toastAlert('Lo sentimos, ocrurrió un error', '');
                console.log(err);
            },
        );
    }

    // Obtencion de datos(categorias y marcas) separados por admin o vendedor
    // =========================================================================
    getDatos() {
        this.getCategorias();
        this.getMarcas();
    }

    getCategorias(refresh?: boolean) {
        // enviamos refresh:
        // false = para que obtenga lo que tiene en memoria, si es que tiene.
        // true = refresque datos desde el server.
        this.categorias$ = this._categorias
            .getAll(refresh)
            .pipe(tap((data: Categorias[]) => this.checkCategorias(data)));
    }

    getMarcas() {
        if (this.idPrivilegio == 1) {
            // Admin..
            // console.log('Admin, obteniendo todas las marcas');
            this.marcas$ = this._marcas
                .getAll(true)
                .pipe(tap((data: Marcas[]) => this.checkMarcas(data)));
        } else if (this.idPrivilegio == 2) {
            // vendedor
            // console.log('Obteniendo marcas por id comercio');
            this.marcas$ = this._marcas
                .getByComercio(this.idComercio)
                .pipe(tap((data: Marcas[]) => this.checkMarcas(data)));
        }
    }

    /**
     * Función para comparar los valores de los objetos(marcaId y los del arrMarcas)
     * cuando coincidan lo selecciona.
     *
     * @param c1 objetos de arrMarcas[]
     * @param c2 objeto marcaId
     */
    compareMarcas(c1: any, c2: any): boolean {
        return c1 && c2 ? c1.id === c2.id : c1 === c2;
    }

    compareCategorias(c1: any, c2: any): boolean {
        return c1 && c2 ? c1.id === c2.id : c1 === c2;
    }

    compareComercio(c1: any, c2: any): boolean {
        return c1 && c2 ? c1.id === c2.id : c1 === c2;
    }

    compareUnidad(c1: any, c2: any): boolean {
        return c1 && c2 ? c1 === c2 : c1 === c2;
    }
    // =========================================================================

    // Se ejecuta cuando se cambia de comercio
    changeIdComercio() {
        this.idComercio = this.ProductosForm.comercioId.id;
        this.checkCantProds();
    }

    // Sección CHECKS
    // ===========================
    async checkCantProds() {
        this.blockConfirm = await this._utilProducto.checkCantProds(
            this.ProductosForm,
        );
    }

    checkMarcas(data: Marcas[]) {
        if (data.length == 0) {
            this._alert.toastAlert('Actualmente no tienes marcas cargadas', '');
        }
    }

    checkCategorias(data: Categorias[]) {
        if (data.length == 0) {
            this._alert.toastAlert(
                'Actualmente no hay categorías cargadas',
                '',
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
        // asignamos el primer id de los comercios que encuentre
        this.idComercio = data[0].id;

        // comprobamos si el producto va a ser uno nuevo, así asignamos el primer comercio,
        // de lo contrario lo omite y compareWith selecciona el comercio que está asociado.
        if (this.ProductosForm.id == null) {
            this.ProductosForm.comercioId = data[0];
            this.checkCantProds();
        }
        this.getDatos();
    }

    checkData(): Promise<boolean> {
        // console.log('Check data', this.ProductosForm);
        return new Promise((resolve, reject) => {
            if (
                this.ProductosForm.nombre === null ||
                this.ProductosForm.descripcion === null ||
                this.ProductosForm.precio_venta === null ||
                this.ProductosForm.categoriaId === null ||
                this.ProductosForm.comercioId === null
            ) {
                resolve(false);
            } else {
                resolve(true);
            }
        });
    }

    checkTipoVenta() {
        // Checkea los atributos disponible_compra y disponible_consulta
        // para luego setearlos
        if (this.ProductosForm.disponible_compra) {
            this.setTipoVenta(1);
        } else if (this.ProductosForm.disponible_consulta) {
            this.setTipoVenta(2);
        }
    }

    checkImagenes() {
        // Chequeamos la cantidad de imagenes que tiene cargada el producto
        if (
            this.ProductosForm.imagenes != null &&
            this.ProductosForm.imagenes.length >= 5
        ) {
            this.blockCargaImgs = true;
        } else {
            this.blockCargaImgs = false;
        }
    }

    setTipoVenta(tipo: number) {
        // Setea los atributos disponible_compra y disponible_consulta
        if (tipo == 1) {
            this.showPermiteCompra = true;
            this.showPermiteConsulta = false;
            this.ProductosForm.disponible_compra = true;
            this.ProductosForm.disponible_consulta = false;
        } else {
            this.showPermiteConsulta = true;
            this.showPermiteCompra = false;
            this.ProductosForm.disponible_compra = false;
            this.ProductosForm.disponible_consulta = true;
        }
    }

    // ===============================================================================================
    // Sección imágenes
    // ===============================================================================================
    cargarImagen() {
        this._alert
            .sweetConfirm('Imagen', '¿Desea agregar una imagen a su producto?')
            .then((val: boolean) => {
                if (val) {
                    document.getElementById('foto').click();
                }
            });
    }

    deleteImg(img) {
        this._alert
            .sweetConfirm('¿Eliminar?', '¿Realmente desea eliminar la imagen?')
            .then((val: boolean) => {
                if (val) {
                    const i = this.ProductosForm.imagenes.indexOf(img); // buscamos el indice
                    this.ProductosForm.imagenes.splice(i, 1); // eliminamos la img
                    this.update(); // Actualizamos el producto
                    // this.checkImagenes();
                }
            });
    }

    async onUpload(file) {
        const val: boolean = await this.checkData();
        if (!val) {
            return this._alert.toastError(
                'Complete los campos necesarios.',
                'Error',
            );
        }
        const fd = new FormData();
        fd.append('file', file, file.name);
        const token: string = await this._auth.returnToken();

        this._fu.onUpload(fd, this.ProductosForm, token).subscribe(
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
                            '¡Imagen agregada con éxito!',
                            '',
                        );
                        this.get(this.ProductosForm.id);
                        this.progreso = '';
                        this.imageChangedEvent = '';
                        this.croppedImage = '';
                    }
                }
            },
            (err) => {
                this._alert.toastError('Intente nuevamente', 'Error');
                console.log(err);
            },
        );
    }

    convertImg() {
        const url = this.croppedImage;
        fetch(url)
            .then((res) => res.blob())
            .then((blob) => {
                const file = new File([blob], '.jpg', { type: 'image/jpg' });
                this.onUpload(file);
            })
            .catch((err) => {
                this._alert.toastError(
                    'Ocurrió un error al convertir la imagen.',
                    '',
                );
            });
    }

    fileChangeEvent(event: any): void {
        this.imageChangedEvent = event;
    }

    imageCropped(event: ImageCroppedEvent) {
        this.croppedImage = event.base64;
    }

    imageLoaded() {
        // show cropper
    }

    cropperReady() {
        // cropper ready
    }

    loadImageFailed() {
        // show message
    }
}
