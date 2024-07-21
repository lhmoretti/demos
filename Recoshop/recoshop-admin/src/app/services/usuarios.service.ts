import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Endpoint } from '../endpoint';
import { Observable, Subject } from 'rxjs';
import { Usuarios } from '../models/Usuarios';
import { Router } from '@angular/router';
import { HttpOptions } from './globales/httpOptions';
import { map, catchError } from 'rxjs/operators';
import { HandleErrorService } from './globales/handle-error.service';
import { Comercios } from '../models/Comercios';

@Injectable({
    providedIn: 'root',
})
export class UsuariosService {
    private UrlRestS = Endpoint.UrlRest + '/usuarios';
    private UrlRest = Endpoint.UrlRest + '/usuario';

    httpOptions = HttpOptions.httpOptions;
    private usuarios: Usuarios[] = null;

    user: Usuarios;
    usuarioSubject = new Subject<Usuarios>();
    hideFormSubject = new Subject<boolean>();

    constructor(
        private http: HttpClient,
        private he: HandleErrorService,
        private router: Router,
    ) {}

    // Usuarios
    // =======================================
    public passUser(user: Usuarios): void {
        this.user = user;
        this.returnUser();
    }

    public returnUser() {
        return this.usuarioSubject.next(this.user);
    }

    public obsUser(): Observable<Usuarios> {
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

    public getAll() {
        return this.http
            .get<Usuarios[]>(`${this.UrlRestS}`, this.httpOptions)
            .pipe(
                map((res) => {
                    return res as Usuarios[];
                }),
                catchError(this.he.handleError),
            );
    }

    public getPaginatedByRole(
        size: number,
        nro: number,
        role: number,
    ): Observable<Usuarios[]> {
        const params = new HttpParams()
            .set('pageSize', size.toString())
            .set('pageNro', nro.toString());
        return this.http
            .get<Usuarios[]>(`${this.UrlRestS}/paginado/role/${role}`, {
                params,
            })
            .pipe(
                map((res) => {
                    return res as Usuarios[];
                }),
                catchError(this.he.handleError),
            );
    }

    public getPaginatedByTxt(
        size: number,
        nro: number,
        attr: string,
        txt: string,
    ): Observable<Usuarios[]> {
        const params = new HttpParams()
            .set('pageSize', size.toString())
            .set('pageNro', nro.toString())
            .set('attr', attr)
            .set('filter', txt);
        return this.http
            .get<Usuarios[]>(`${this.UrlRestS}/paginado`, { params })
            .pipe(
                map((res) => {
                    return res as Usuarios[];
                }),
                catchError(this.he.handleError),
            );
    }

    //  ====================================================================================
    public update(user: Usuarios): Observable<Usuarios> {
        return this.http
            .put<Usuarios>(`${this.UrlRest}/${user.id}`, user, this.httpOptions)
            .pipe(
                map((res) => {
                    return res as Usuarios;
                }),
                catchError(this.he.handleError),
            );
    }

    public post(user: Usuarios): Observable<Usuarios> {
        return this.http
            .post<Usuarios>(`${this.UrlRestS}`, user, this.httpOptions)
            .pipe(
                map((res) => {
                    return res as Usuarios;
                }),
                catchError(this.he.handleError),
            );
    }

    public delete(id: number): Observable<Usuarios> {
        return this.http
            .delete<Usuarios>(`${this.UrlRest}/${id}`, this.httpOptions)
            .pipe(
                map((res) => {
                    return res as Usuarios;
                }),
                catchError(this.he.handleError),
            );
    }

    public getComerciosByIdUsuario(id: number): Observable<Comercios[]> {
        return this.http
            .get<Comercios[]>(`${this.UrlRest}/${id}`, this.httpOptions)
            .pipe(
                map((res) => {
                    return res as Comercios[];
                }),
                catchError(this.he.handleError),
            );
    }
}
