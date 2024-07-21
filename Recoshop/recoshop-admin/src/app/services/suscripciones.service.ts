import { Injectable } from '@angular/core';
import { Suscripciones } from '../models/Suscripciones';
import { Subject, Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { HttpOptions } from './globales/httpOptions';
import { Endpoint } from '../endpoint';
import { HandleErrorService } from './globales/handle-error.service';

@Injectable({
    providedIn: 'root',
})
export class SuscripcionesService {
    private UrlRestS = Endpoint.UrlRest + '/suscripciones';
    private UrlRest = Endpoint.UrlRest + '/suscripcion';

    httpOptions = HttpOptions.httpOptions;

    constructor(
        private http: HttpClient,
        private he: HandleErrorService,
        private router: Router,
    ) {}

    public getPaginated(
        size: number,
        nro: number,
    ): Observable<Suscripciones[]> {
        const params = new HttpParams()
            .set('pageSize', size.toString())
            .set('pageNro', nro.toString());
        return this.http
            .get<Suscripciones[]>(`${this.UrlRestS}/paginado`, { params })
            .pipe(
                map((res) => {
                    return res.suscripcion as Suscripciones[];
                }),
                catchError(this.he.handleError),
            );
    }

    //  ====================================================================================

    public getAll() {
        return this.http
            .get<Suscripciones[]>(`${this.UrlRestS}`, this.httpOptions)
            .pipe(
                map((res) => {
                    return res as Suscripciones[];
                }),
                catchError(this.he.handleError),
            );
    }

    public update(user: Suscripciones): Observable<Suscripciones> {
        return this.http
            .put<Suscripciones>(
                `${this.UrlRest}/${user.id}`,
                user,
                this.httpOptions,
            )
            .pipe(
                map((res) => {
                    return res as Suscripciones;
                }),
                catchError(this.he.handleError),
            );
    }

    public post(user: Suscripciones): Observable<Suscripciones> {
        return this.http
            .post<Suscripciones>(`${this.UrlRestS}`, user, this.httpOptions)
            .pipe(
                map((res) => {
                    return res as Suscripciones;
                }),
                catchError(this.he.handleError),
            );
    }

    public delete(id: number): Observable<Suscripciones> {
        return this.http
            .delete<Suscripciones>(`${this.UrlRest}/${id}`, this.httpOptions)
            .pipe(
                map((res) => {
                    return res as Suscripciones;
                }),
                catchError(this.he.handleError),
            );
    }
}
