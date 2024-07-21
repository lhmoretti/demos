import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Producto } from '../models/producto.model';
import { HandleErrorService } from './handle-error.service';
import { Router } from '@angular/router';

const URL = environment.url;

@Injectable({
    providedIn: 'root',
})
export class ProductosService {
    private txtSubj = new Subject<string>();
    txt = '';

    constructor(
        private _http: HttpClient,
        private he: HandleErrorService,
        private router: Router,
    ) {}

    returnTxt(): Observable<string> {
        return this.txtSubj.asObservable();
    }

    getTxt() {
        this.txtSubj.next(this.txt);
    }
    addTxt(txt) {
        this.txt = txt;
        this.getTxt();
    }

    getProductosDestacados() {
        return this._http.get(`${URL}/productos/destacados`);
    }

    getProductosPromocion() {
        return this._http.get(`${URL}/productos/destacados`);
    }

    getById(id) {
        return this._http.get(`${URL}/producto/${id}`);
    }

    busquedaProductos(txt, nroPage, sizePage) {
        let params = new HttpParams();
        params = params.append('pageNro', String(nroPage));
        params = params.append('pageSize', String(sizePage));
        params = params.append('attr', 'nombre');
        params = params.append('filter', String(txt));

        return this._http.get(`${URL}/productos/paginado`, { params });
    }

    getByCategoria(id, nroPage, sizePage) {
        let params = new HttpParams();
        params = params.append('pageNro', String(nroPage));
        params = params.append('pageSize', String(sizePage));
        return this._http.get(`${URL}/productos/paginado/categoria/${id}`, {
            params,
        });
    }

    getProductosByComercio(idComercio) {
        return this._http.get(`${URL}/productos/comercio/${idComercio}`);
    }

    // ===============================================================================
    // ===============================================================================
    public getProductosByCategoria(idCat: number): Observable<Producto[]> {
        return this._http
            .get<Producto[]>(`${URL}/productos/categoria/${idCat}`)
            .pipe(
                map((res) => {
                    return res as Producto[];
                }),
            );
    }

    public getPromocionComercio(id: number): Observable<Producto[]> {
        return this._http
            .get<Producto[]>(`${URL}/productos/promocion/comercio/${id}`)
            .pipe(
                map((res) => {
                    return res as Producto[];
                }),
                catchError(this.he.handleError),
            );
    }

    public getDestacadosComercio(id: number): Observable<Producto[]> {
        return this._http
            .get<Producto[]>(`${URL}/productos/destacados/comercio/${id}`)
            .pipe(
                map((res) => {
                    return res as Producto[];
                }),
                catchError(this.he.handleError),
            );
    }

    public getPromocionGeneral(): Observable<Producto[]> {
        return this._http.get<Producto[]>(`${URL}/productos/promocion`).pipe(
            map((res) => {
                return res as Producto[];
            }),
            catchError(this.he.handleError),
        );
    }

    public getDestacadosGeneral(): Observable<Producto[]> {
        return this._http.get<Producto[]>(`${URL}/productos/destacados`).pipe(
            map((res) => {
                return res as Producto[];
            }),
            catchError(this.he.handleError),
        );
    }

    public getInicio(): Observable<Producto[]> {
        return this._http.get<Producto[]>(`${URL}/productos/inicio`).pipe(
            map((res) => {
                return res as Producto[];
            }),
            catchError(this.he.handleError),
        );
    }

    public verProducto(p: Producto) {
        let nombreSE = '';
        for (let i = 0; i < p.nombre.length; i++) {
            nombreSE += p.nombre.charAt(i) == ' ' ? '-' : p.nombre.charAt(i);
        }
        this.router.navigate(['ver-articulo', p.id, nombreSE]);
    }
}
