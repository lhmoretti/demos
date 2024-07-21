import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Endpoint } from '../endpoint';
import { Observable, Subject } from 'rxjs';
import { Comercios } from '../models/Comercios';
import { Router } from '@angular/router';
import { HttpOptions } from './globales/httpOptions';
import { map, catchError } from 'rxjs/operators';
import { HandleErrorService } from './globales/handle-error.service';

@Injectable({
    providedIn: 'root',
})
export class ComerciosService {
    private UrlRestS = Endpoint.UrlRest + '/comercios';
    private UrlRest = Endpoint.UrlRest + '/comercio';

    httpOptions = HttpOptions.httpOptions;
    private usuarios: Comercios[] = null;

    com: Comercios;
    usuarioSubject = new Subject<Comercios>();
    hideFormSubject = new Subject<boolean>();

    constructor(
        private http: HttpClient,
        private he: HandleErrorService,
        private router: Router,
    ) {}

    // Comercios
    // =======================================
    public passCom(com: Comercios): void {
        this.com = com;
        this.returnUser();
    }

    public returnUser() {
        return this.usuarioSubject.next(this.com);
    }

    public obsUser(): Observable<Comercios> {
        return this.usuarioSubject.asObservable();
    }

    // Form
    // =======================================
    public obsForm(): Observable<boolean> {
        return this.hideFormSubject.asObservable();
    }

    public hide(state: boolean) {
        return this.hideFormSubject.next(state);
    }

    // =======================================
    public deshablitar(id: number): Observable<Comercios> {
        return this.http
            .put<Comercios>(
                `${this.UrlRestS}/deshabilitar/${id}`,
                this.httpOptions,
            )
            .pipe(
                map((res) => {
                    return res as Comercios;
                }),
                catchError(this.he.handleError),
            );
    }

    public hablitar(id: number): Observable<Comercios> {
        return this.http
            .put<Comercios>(
                `${this.UrlRestS}/habilitar/${id}`,
                this.httpOptions,
            )
            .pipe(
                map((res) => {
                    return res as Comercios;
                }),
                catchError(this.he.handleError),
            );
    }

    public getComerciosHabilitados() {
        return this.http
            .get<Comercios[]>(`${this.UrlRestS}/habilitados`, this.httpOptions)
            .pipe(
                map((res) => {
                    return res as Comercios[];
                }),
                catchError(this.he.handleError),
            );
    }

    public getComerciosInhabilitados() {
        return this.http
            .get<Comercios[]>(
                `${this.UrlRestS}/deshabilitados`,
                this.httpOptions,
            )
            .pipe(
                map((res) => {
                    console.log(res);
                    return res as Comercios[];
                }),
                catchError(this.he.handleError),
            );
    }

    public getPaginated(size: number, nro: number): Observable<Comercios[]> {
        const params = new HttpParams()
            .set('pageSize', size.toString())
            .set('pageNro', nro.toString());
        return this.http
            .get<Comercios[]>(`${this.UrlRestS}/paginado`, { params })
            .pipe(
                map((res) => {
                    return res as Comercios[];
                }),
                catchError(this.he.handleError),
            );
    }

    public getPaginatedByTxt(
        size: number,
        nro: number,
        attr: string,
        txt: string,
    ): Observable<Comercios[]> {
        const params = new HttpParams()
            .set('pageSize', size.toString())
            .set('pageNro', nro.toString())
            .set('attr', attr)
            .set('filter', txt);
        return this.http
            .get<Comercios[]>(`${this.UrlRestS}/paginado`, { params })
            .pipe(
                map((res) => {
                    return res as Comercios[];
                }),
                catchError(this.he.handleError),
            );
    }

    public getComerciosByIdUsuario(id: number) {
        return this.http
            .get<Comercios[]>(
                `${this.UrlRestS}/usuario/${id}`,
                this.httpOptions,
            )
            .pipe(
                map((res) => {
                    return res.comercios as Comercios[];
                }),
                catchError(this.he.handleError),
            );
    }

    //  ====================================================================================
    public update(com: Comercios): Observable<Comercios> {
        return this.http
            .put<Comercios>(`${this.UrlRest}/${com.id}`, com, this.httpOptions)
            .pipe(
                map((res) => {
                    return res as Comercios;
                }),
                catchError(this.he.handleError),
            );
    }

    public post(com: Comercios): Observable<Comercios> {
        return this.http
            .post<Comercios>(`${this.UrlRestS}`, com, this.httpOptions)
            .pipe(
                map((res) => {
                    return res as Comercios;
                }),
                catchError(this.he.handleError),
            );
    }

    public delete(id: number): Observable<Comercios> {
        return this.http
            .delete<Comercios>(`${this.UrlRest}/${id}`, this.httpOptions)
            .pipe(
                map((res) => {
                    return res as Comercios;
                }),
                catchError(this.he.handleError),
            );
    }

    public get(id: number): Observable<Comercios> {
        return this.http
            .get<Comercios>(`${this.UrlRest}/${id}`, this.httpOptions)
            .pipe(
                map((res) => {
                    return res as Comercios;
                }),
                catchError(this.he.handleError),
            );
    }

    public mercadoPagoConfirmacion(link, authCode) {
        // Headers
        const httpHeaders = new HttpHeaders()
            .set('accept', 'application/json')
            .set('content-type', 'application/x-www-form-urlencoded')
            .set('host', 'api.mercadopago.com');
        // Params
        const httpParams = new HttpParams()
            .set(
                'client_secret',
                'TEST-7163447677445067-080318-6e824e356f21f692d25126684b307e2e-577061695',
            )
            .set('grant_type', 'authorization_code')
            .set('code', authCode)
            .set(
                'redirect_uri',
                'https://your-domain.com.ar/api/v1/mercadopago/adhesionmarketplace',
            );
        return this.http.post(link, null, {
            params: httpParams,
            headers: httpHeaders,
        });
    }

    //  ====================================================================================
    public getCorreos(): Observable<any[]> {
        return this.http
            .get<any[]>(`${this.UrlRestS}/correos`, this.httpOptions)
            .pipe(
                map((res) => {
                    return res as any[];
                }),
                catchError(this.he.handleError),
            );
    }
}
