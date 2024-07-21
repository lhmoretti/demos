import { Injectable } from '@angular/core';
import { Endpoint } from '../endpoint';
import { Productos } from '../models/Productos';
import { Subject, Observable } from 'rxjs';
import { HttpClient, HttpParams, HttpEventType } from '@angular/common/http';
import { Router } from '@angular/router';
import { map, catchError } from 'rxjs/operators';
import { HandleErrorService } from './globales/handle-error.service';
import { HttpOptions } from './globales/httpOptions';

@Injectable({
    providedIn: 'root',
})
export class ProductosService {
    private UrlRestS = Endpoint.UrlRest + '/productos';
    private UrlRest = Endpoint.UrlRest + '/producto';

    httpOptions = HttpOptions.httpOptions;

    art: Productos;
    public articuloSubject = new Subject<Productos>();
    public hideFormSubject = new Subject<boolean>();

    constructor(private http: HttpClient, private he: HandleErrorService) {}

    public obsArt(): Observable<Productos> {
        return this.articuloSubject.asObservable();
    }

    public obsForm(): Observable<boolean> {
        return this.hideFormSubject.asObservable();
    }

    public hide(hide: boolean) {
        return this.hideFormSubject.next(hide);
    }

    public passArt(art: Productos): any {
        this.art = art;
        this.hideFormSubject.next(true);
        this.returnArt();
    }

    public returnArt() {
        return this.articuloSubject.next(this.art);
    }

    public getPaginated(size: number, nro: number): Observable<Productos[]> {
        const params = new HttpParams()
            .set('pageSize', size.toString())
            .set('pageNro', nro.toString());
        return this.http
            .get<Productos[]>(`${this.UrlRestS}/paginado`, { params })
            .pipe(
                map((res) => {
                    return res as Productos[];
                }),
                catchError(this.he.handleError),
            );
    }

    public getPaginatedByComercio(
        size: number,
        nro: number,
        id: number,
    ): Observable<Productos[]> {
        const params = new HttpParams()
            .set('pageSize', size.toString())
            .set('pageNro', nro.toString());
        return this.http
            .get<Productos[]>(`${this.UrlRestS}/paginado/comercio/${id}`, {
                params,
            })
            .pipe(
                map((res) => {
                    return res as Productos[];
                }),
                catchError(this.he.handleError),
            );
    }

    public getPaginatedByTxt(
        size: number,
        nro: number,
        attr: string,
        txt: string,
    ): Observable<Productos[]> {
        const params = new HttpParams()
            .set('pageSize', size.toString())
            .set('pageNro', nro.toString())
            .set('attr', attr.toString())
            .set('filter', txt);
        return this.http
            .get<Productos[]>(`${this.UrlRestS}/paginado`, { params })
            .pipe(
                map((res) => {
                    return res as Productos[];
                }),
                catchError(this.he.handleError),
            );
    }

    public getPaginatedByDisp(
        size: number,
        nro: number,
        attr: string,
        disp: boolean,
    ): Observable<Productos[]> {
        const params = new HttpParams()
            .set('pageSize', size.toString())
            .set('pageNro', nro.toString())
            .set('attr', attr.toString())
            .set('filter', disp.toString());
        return this.http
            .get<Productos[]>(`${this.UrlRestS}/paginado`, { params })
            .pipe(
                map((res) => {
                    return res as Productos[];
                }),
                catchError(this.he.handleError),
            );
    }

    public getFilterAndPag(
        size: number,
        nro: number,
        idmar: string,
        idcat: string,
    ): Observable<Productos[]> {
        const params = new HttpParams()
            .set('pageSize', size.toString())
            .set('pageNro', nro.toString())
            .set('idMarca', typeof idmar == 'string' ? '' : idmar)
            .set('idCategoria', typeof idcat == 'string' ? '' : idcat);
        return this.http
            .get<Productos[]>(`${this.UrlRestS}/filtrados/`, { params })
            .pipe(
                map((res) => {
                    return res as Productos[];
                }),
                catchError(this.he.handleError),
            );
    }

    // =============================================================================================
    public getPromocionComercio(id: number): Observable<Productos[]> {
        return this.http
            .get<Productos[]>(`${this.UrlRestS}/promocion/comercio/${id}`)
            .pipe(
                map((res) => {
                    return res as Productos[];
                }),
                catchError(this.he.handleError),
            );
    }

    public getDestacadosComercio(id: number): Observable<Productos[]> {
        return this.http
            .get<Productos[]>(`${this.UrlRestS}/destacados/comercio/${id}`)
            .pipe(
                map((res) => {
                    return res as Productos[];
                }),
                catchError(this.he.handleError),
            );
    }

    public getPromocionGeneral(): Observable<Productos[]> {
        return this.http.get<Productos[]>(`${this.UrlRestS}/promocion`).pipe(
            map((res) => {
                return res as Productos[];
            }),
            catchError(this.he.handleError),
        );
    }

    public getDestacadosGeneral(): Observable<Productos[]> {
        return this.http.get<Productos[]>(`${this.UrlRestS}/destacados`).pipe(
            map((res) => {
                return res as Productos[];
            }),
            catchError(this.he.handleError),
        );
    }

    // =============================================================================================
    public get(id: number): Observable<Productos> {
        return this.http.get<Productos>(`${this.UrlRest}/${id}`).pipe(
            map((res) => {
                return res as Productos;
            }),
            catchError(this.he.handleError),
        );
    }

    public getAll(): Observable<Productos[]> {
        return this.http.get<Productos[]>(`${this.UrlRestS}`).pipe(
            map((res) => {
                return res as Productos[];
            }),
            catchError(this.he.handleError),
        );
    }

    public post(prod: Productos): Observable<Productos> {
        return this.http
            .post<Productos>(`${this.UrlRestS}`, prod, this.httpOptions)
            .pipe(
                map((res) => {
                    return res as Productos;
                }),
                catchError(this.he.handleError),
            );
    }

    public update(prod: Productos): Observable<Productos> {
        return this.http
            .put<Productos>(
                `${this.UrlRest}/${prod.id}`,
                prod,
                this.httpOptions,
            )
            .pipe(
                map((res) => {
                    return res as Productos;
                }),
                catchError(this.he.handleError),
            );
    }

    public delete(id: number): Observable<Productos> {
        return this.http
            .delete<Productos>(`${this.UrlRest}/${id}`, this.httpOptions)
            .pipe(
                map((res) => {
                    return res as Productos;
                }),
                catchError(this.he.handleError),
            );
    }

    // =============================================================================================
    public getAllByComercio(id: number): Observable<Productos[]> {
        return this.http
            .get<Productos[]>(`${this.UrlRestS}/comercio/${id}`)
            .pipe(
                map((res) => {
                    console.log(res);
                    return res as Productos[];
                }),
                catchError(this.he.handleError),
            );
    }

    public getCountProdsComercio(id: number): Observable<any> {
        return this.http.get<any>(`${this.UrlRestS}/count/comercio/${id}`).pipe(
            map((res) => {
                return res.count as any;
            }),
            catchError(this.he.handleError),
        );
    }

    public getProductosPagComCat(
        size: number,
        nro: number,
        idCom: number,
        idCat: number,
    ): Observable<Productos[]> {
        const params = new HttpParams()
            .set('pageSize', size.toString())
            .set('pageNro', nro.toString());

        return this.http
            .get<Productos[]>(
                `${this.UrlRestS}/paginado/comercio/${idCom}/categoria/${idCat}`,
                { params },
            )
            .pipe(
                map((res) => {
                    return res as Productos[];
                }),
                catchError(this.he.handleError),
            );
    }

    public getProductosByCategoria(
        size: number,
        nro: number,
        idCat: number,
    ): Observable<Productos[]> {
        const params = new HttpParams()
            .set('pageSize', size.toString())
            .set('pageNro', nro.toString());

        return this.http
            .get<Productos[]>(`${this.UrlRestS}/categoria/${idCat}`, { params })
            .pipe(
                map((res) => {
                    return res as Productos[];
                }),
                catchError(this.he.handleError),
            );
    }
    // =============================================================================================
}
