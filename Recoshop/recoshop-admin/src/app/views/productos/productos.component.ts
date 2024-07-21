import {
    Component,
    OnInit,
    AfterViewInit,
    ViewChild,
    ElementRef,
} from '@angular/core';
import { Productos, ProductosJson } from 'src/app/models/Productos';
import { ProductosService } from 'src/app/services/productos.service';
import { AlertasService } from 'src/app/services/globales/alertas.service';
import { Categorias } from 'src/app/models/Categorias';
import { CategoriasService } from 'src/app/services/categorias.service';
import { Subscription, Observable, fromEvent } from 'rxjs';
import { Marcas } from 'src/app/models/Marcas';
import { MarcasService } from 'src/app/services/marcas.service';
import { PaginacionService } from 'src/app/services/globales/paginacion/paginacion.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ComerciosService } from 'src/app/services/comercios.service';
import { Comercios } from 'src/app/models/Comercios';
import {
    map,
    tap,
    catchError,
    debounceTime,
    distinctUntilChanged,
} from 'rxjs/operators';
import { HandleErrorService } from 'src/app/services/globales/handle-error.service';
import { UtilProductService } from 'src/app/utils/products';

@Component({
    selector: 'app-productos',
    templateUrl: './productos.component.html',
    styleUrls: ['./productos.component.css'],
})
export class ProductosComponent implements OnInit, AfterViewInit {
    evt: Subscription;
    // @ViewChild('iptStock', { read: ElementRef }) iptStock: ElementRef;
    formSubs: Subscription;
    idUsuario: number;
    idComercio: number;
    idPrivilegio: number;
    idCategoriaForProds: number;
    // ids de filtros
    idCategoria: number;
    idMarca: number;
    filter = 'F';
    size: number;
    nro: number;

    comercios$: Observable<Comercios[]>;
    productos$: Observable<Productos[]>;
    categorias$: Observable<Categorias[]>;
    marcas$: Observable<Marcas[]>;

    showForm = false;
    showMarcas: boolean;
    showCategorias: boolean;
    showPromocion: boolean;
    showDestacados: boolean;
    showLoading: boolean;
    habilitarEdicion = false;

    constructor(
        private _utilProduct: UtilProductService,
        private _marcas: MarcasService,
        private _categorias: CategoriasService,
        private _comercios: ComerciosService,
        private _productos: ProductosService,
        private _alert: AlertasService,
        private _auth: AuthService,
        private _pag: PaginacionService,
        private he: HandleErrorService,
    ) {
        this.formSubs = this._productos
            .obsForm()
            .subscribe((data: boolean) => (this.showForm = data));
    }

    async ngOnInit() {
        this.showLoading = true;
        this.idUsuario = await this._auth.returnIdUsuario();
        this.idPrivilegio = await this._auth.returnRole();
        // seleccion de gets, admin o vendedor:
        this.getComerciosByUsuario();
    }

    ngOnDestroy(): void {
        this.formSubs.unsubscribe();
    }

    ngAfterViewInit() {
        // timeout porque no alcanza a renderizar toda la pagina incluso
        // en esta funcion
        setTimeout(() => {
            this.evt = fromEvent(
                document.getElementsByTagName('input'),
                'keyup',
            )
                .pipe(
                    debounceTime(1200),
                    distinctUntilChanged(),
                    tap((res) => {
                        console.log('tap');
                        this.trigger();
                    }),
                )
                .subscribe();
        }, 1000);
    }

    trigger() {
        console.log('trigger');
        // document.getElementById('btnEnter').click();
    }

    passArt(art: Productos) {
        this._productos.hide(true);
        this._productos.passArt(art);
    }

    // Obtenemos los comercios, dependiendo si es el Admin o un vendedor
    getComerciosByUsuario() {
        if (this.idPrivilegio == 1) {
            // admin
            // buscamos TODOS los comercios Habilitados
            this.comercios$ = this._comercios.getComerciosHabilitados().pipe(
                tap((data: Comercios[]) => this.checkComercios(data)),
                // map((data)=> {return <Comercios[]>data['comercios']})
            );
        } else {
            // vendedor
            // buscamos los comercios asociados al usuario
            this.comercios$ = this._comercios
                .getComerciosByIdUsuario(this.idUsuario)
                .pipe(
                    tap((data: Comercios[]) => this.checkComercios(data)),
                    // map((data)=> {return <Comercios[]>data['comercios']})
                );
        }
    }

    getByFilter() {
        if (this.filter == 'comercio') {
            // this.getAllComercios();
        } else if (this.filter == 'categoria') {
            this.getCategorias();
        } else if (this.filter == 'dest') {
            this.getDestacadosByComercio();
        } else if (this.filter == 'prom') {
            this.getPromocionByComercio();
        }
    }

    new() {
        if (this.idPrivilegio == 1) {
            // admin
            // buscamos TODOS los comercios Habilitados
            this._comercios
                .getComerciosHabilitados()
                .subscribe((data: Comercios[]) =>
                    this.checkComerciosForNewProd(data),
                );
        } else {
            // vendedor
            // buscamos los comercios asociados al usuario
            this._comercios
                .getComerciosByIdUsuario(this.idUsuario)
                .subscribe((data: Comercios[]) =>
                    this.checkComerciosForNewProd(data),
                );
        }
    }

    volver() {
        this._productos.hide(false);
    }

    update(p: Productos) {
        this._alert.sweetEdit().then((res) => {
            if (res) {
                this._productos.update(p).subscribe(
                    () => {
                        this._alert.toastSuccess(
                            '¡Producto actualizado con éxito!',
                            '',
                        );
                        // this._productos.hide(false);  // Una vez actualizado volvemos a la pag de productos
                        // this.get(art.id); // hacemos get del producto actualizado
                        // this.checkImagenes(); // chequeamos cantidad de imagenes cargadas
                        this.habilitarEdicion = false;
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
        });
    }

    delete(id: number) {
        this._alert.sweetDelete().then((res) => {
            if (res) {
                this._productos.delete(id).subscribe(
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

    async archivar(producto: Productos) {
        const resp = await this._utilProduct.archivar(producto);
        this.getPaginatedByComercio();
    }

    // ===============================================================

    // Sección de funciones encargadas del paginado de peticiones
    // ===============================================================
    pageChanged(event) {
        // maneja el tamaño y numero del paginado
        this.nro = event.pageNro;
        this.size = event.pageSize;
        this.getPag();
    }

    reset() {
        // resetea la pagina
        // this._productos.hide(false);
        this._pag.setPag(0);
        this.getPag();
    }

    getPag() {
        // si es admin..
        if (this.idPrivilegio == 1) {
            // si se selecciono un comercio, buscamos los productos del comercio por el id
            if (this.idComercio != null || this.idComercio != undefined) {
                this.getPaginatedByComercio();
                // console.log('Admin, Obteniendo por Id Comercio');
            } else {
                this.getPaginated();
                // console.log('Admin, Obteniendo todos');
            }
        }
        // si es vendedor..
        else if (this.idPrivilegio == 2) {
            this.getPaginatedByComercio();
            // console.log('Vendedor, Obteniendo por Id');
        }
    }
    //  /  Sección de funciones encargadas del paginado de peticiones
    // ===============================================================

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
            this._marcas
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

    // Obtencion de PRODUCTOS
    // =========================================================================
    getDestacadosByComercio() {
        // para los vendedores
        this.productos$ = this._productos
            .getDestacadosComercio(this.idComercio)
            .pipe(tap((data: Productos[]) => this.checkProductos(data)));
    }

    getPromocionByComercio() {
        // para los vendedores
        this.productos$ = this._productos
            .getPromocionComercio(this.idComercio)
            .pipe(tap((data: Productos[]) => this.checkProductos(data)));
    }

    getProdsByComercio() {
        // solo para admin
        this.productos$ = this._productos
            .getAllByComercio(this.idComercio)
            .pipe(
                tap((data: Productos[]) => {
                    this.checkProductos(data);
                }),
            );
    }

    getProductosPagComCat() {
        this.productos$ = this._productos
            .getProductosPagComCat(
                this.size,
                this.nro,
                this.idComercio,
                this.idCategoriaForProds,
            )
            .pipe(tap((data: Productos[]) => this.checkProductos(data)));
    }

    getFilterAndPag() {
        if (this.nro < 0) {
            return;
        }
        this.productos$ = this._productos
            .getFilterAndPag(
                this.size,
                this.nro,
                this.idMarca.toString(),
                this.idCategoria.toString(),
            )
            .pipe(
                tap((data: Productos[]) => {
                    this.checkProductos(data);
                }),
            );
    }

    getPaginated() {
        if (this.nro < 0) {
            return;
        }
        this.productos$ = this._productos
            .getPaginated(this.size, this.nro)
            .pipe(
                tap(
                    (data: Productos[]) => this.checkProductos(data),
                    catchError((err) => this.he.handleError(err)),
                ),
            );
    }

    getPaginatedByComercio() {
        if (this.nro < 0) {
            return;
        }
        this.productos$ = this._productos
            .getPaginatedByComercio(this.size, this.nro, this.idComercio)
            .pipe(
                tap((data: Productos[]) => {
                    this.checkProductos(data),
                        catchError((err) => this.he.handleError(err));
                }),
            );
    }

    getPaginatedByTxt() {
        if (this.nro < 0) {
            return;
        }
        // if (this.attr === 'disponible') {
        //   this._productos.getPaginatedByDisp(this.size, this.nro, this.attr, this.chkDisponible).subscribe(
        //     (data: Productos[]) => {
        //       this.fillArrayProductos(data);
        //     });
        // } else {
        //   this._productos.getPaginatedByTxt(this.size, this.nro, this.attr, this.txt).subscribe(
        //     (data: Productos[]) => {
        //       this.fillArrayProductos(data);
        //     });
        // }
    }
    // =========================================================================

    //   Checks
    // =========================================================================
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
        console.log('data', data);

        if (data.length == 0) {
            this._alert.toastAlert(
                'Actualmente no hay comercios habilitados',
                '',
            );
            return;
        }
        this.idComercio = data[0].id; // asignamos el primer id de los comercios que encuentre
        this.getDatos();
        this.getPag();
    }

    checkComerciosForNewProd(data: Comercios[]) {
        if (data.length === 0) {
            this._alert.toastAlert(
                'Para cargar un producto debes tener al menos un comercio.',
                '',
            );
            return;
        } else {
            const pj: ProductosJson = new ProductosJson();
            const art: Productos = pj.ProductoJson;
            this._productos.passArt(art);
            this._productos.hide(true);
        }
    }

    // carga de productos al array
    checkProductos(data: Productos[]) {
        if (data.length == 0) {
            this.showLoading = false;
            this._pag.setBlockBtn(true);
            this._alert.toastAlert('No se han encontrado productos', '');
            return;
        }
        this._pag.setBlockBtn(false);
        this.showLoading = false;
    }
}
