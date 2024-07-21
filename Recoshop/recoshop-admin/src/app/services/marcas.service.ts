import { Injectable } from '@angular/core';
import { Marcas } from '../models/Marcas';
import { Endpoint } from '../endpoint';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { HttpOptions } from './globales/httpOptions';
import { HandleErrorService } from './globales/handle-error.service';
import { map, catchError, tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class MarcasService {
    private UrlRestS = Endpoint.UrlRest + '/marcas';
    private UrlRest = Endpoint.UrlRest + '/marca';

    httpOptions = HttpOptions.httpOptions;

    private marcas: Marcas[] = null;

    constructor(private http: HttpClient, private he: HandleErrorService) {}

    public refresh() {
        this.marcas = [];
        this.marcas = null;
        this.getAll(true);
    }

    //  ====================================================================================
    public get(id: number): Observable<Marcas[]> {
        return this.http
            .get<Marcas[]>(`${this.UrlRest}/Marca/${id}`, this.httpOptions)
            .pipe(
                map((res) => {
                    return res as Marcas[];
                }),
                catchError(this.he.handleError),
            );
    }

    public getAll(refresh: boolean): Observable<Marcas[]> {
        if (this.marcas != null && !refresh) {
            return of([...this.marcas]);
        } else {
            return this.http
                .get<Marcas[]>(`${this.UrlRestS}`, this.httpOptions)
                .pipe(
                    tap((res) => {
                        this.marcas = res as Marcas[];
                    }),
                    map((res) => {
                        return res as Marcas[];
                    }),
                    catchError(this.he.handleError),
                );
        }
    }

    public post(marca: Marcas): Observable<Marcas> {
        return this.http
            .post<Marcas>(`${this.UrlRestS}`, marca, this.httpOptions)
            .pipe(
                map((res) => {
                    return res as Marcas;
                }),
                catchError(this.he.handleError),
            );
    }

    public update(marca: Marcas): Observable<Marcas> {
        return this.http
            .put<Marcas>(`${this.UrlRest}/${marca.id}`, marca, this.httpOptions)
            .pipe(
                map((res) => {
                    return res as Marcas;
                }),
                catchError(this.he.handleError),
            );
    }

    public delete(id: number): Observable<Marcas> {
        return this.http
            .delete<Marcas>(`${this.UrlRest}/${id}`, this.httpOptions)
            .pipe(
                map((res) => {
                    return res as Marcas;
                }),
                catchError(this.he.handleError),
            );
    }

    //  ====================================================================================
    public getMarcasByCatCom(
        idCat: number,
        idCom: number,
    ): Observable<Marcas[]> {
        return this.http
            .get<Marcas[]>(
                `${this.UrlRestS}/categoria/${idCat}/comercio/${idCom}`,
                this.httpOptions,
            )
            .pipe(
                map((res) => {
                    return res as Marcas[];
                }),
                catchError(this.he.handleError),
            );
    }

    public getByComercio(id: number): Observable<Marcas[]> {
        return this.http
            .get<Marcas[]>(`${this.UrlRestS}/comercio/${id}`, this.httpOptions)
            .pipe(
                map((res) => {
                    return res as Marcas[];
                }),
                catchError(this.he.handleError),
            );
    }
}
