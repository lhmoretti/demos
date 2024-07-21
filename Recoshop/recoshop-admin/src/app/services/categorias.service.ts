import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Endpoint } from '../endpoint';
import { Categorias } from '../models/Categorias';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HandleErrorService } from './globales/handle-error.service';
import { HttpOptions } from './globales/httpOptions';

@Injectable({
    providedIn: 'root',
})
export class CategoriasService {
    private UrlRestS = Endpoint.UrlRest + '/categorias';
    private UrlRest = Endpoint.UrlRest + '/categoria';
    private Url = Endpoint.UrlRest;

    httpOptions = HttpOptions.httpOptions;
    private categorias: Categorias[] = null;

    constructor(private http: HttpClient, private he: HandleErrorService) {}

    public get(id: number): Observable<Categorias[]> {
        return this.http
            .get<Categorias[]>(`${this.UrlRest}/${id}`, this.httpOptions)
            .pipe(
                map((res) => {
                    return res as Categorias[];
                }),
                catchError(this.he.handleError),
            );
    }

    public getAll(refresh: boolean): Observable<Categorias[]> {
        if (this.categorias != null && !refresh) {
            return of([...this.categorias]);
        } else {
            return this.http
                .get<Categorias[]>(`${this.UrlRestS}`, this.httpOptions)
                .pipe(
                    tap((res) => {
                        this.categorias = res as Categorias[];
                    }),
                    map((res) => {
                        return res as Categorias[];
                    }),
                    catchError(this.he.handleError),
                );
        }
    }

    public post(categoria: Categorias): Observable<Categorias> {
        return this.http
            .post<Categorias>(`${this.UrlRestS}`, categoria, this.httpOptions)
            .pipe(
                map((res) => {
                    return res as Categorias;
                }),
                catchError(this.he.handleError),
            );
    }

    public update(categoria: Categorias): Observable<Categorias> {
        return this.http
            .put<Categorias>(
                `${this.UrlRest}/${categoria.id}`,
                categoria,
                this.httpOptions,
            )
            .pipe(
                map((res) => {
                    return res as Categorias;
                }),
                catchError(this.he.handleError),
            );
    }

    public delete(id: number): Observable<Categorias> {
        return this.http
            .delete<Categorias>(`${this.UrlRest}/${id}`, this.httpOptions)
            .pipe(
                map((res) => {
                    return res as Categorias;
                }),
                catchError(this.he.handleError),
            );
    }

    //  ====================================================================================
    public getByComercio(id: number): Observable<Categorias[]> {
        return this.http
            .get<Categorias[]>(
                `${this.UrlRestS}/comercio/${id}`,
                this.httpOptions,
            )
            .pipe(
                map((res) => {
                    return res as Categorias[];
                }),
                catchError(this.he.handleError),
            );
    }

    public onUpload(fd: FormData, token: string): Observable<any> {
        return this.http
            .post(`${this.Url}/files/categoria`, fd, {
                headers: new HttpHeaders({ Authorization: token }),
                reportProgress: true,
                observe: 'events',
            })
            .pipe(catchError(this.he.handleError));
    }
}
