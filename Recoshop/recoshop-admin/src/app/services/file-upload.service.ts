import { Injectable } from '@angular/core';
import { Endpoint } from '../endpoint';
import { AuthService } from './auth/auth.service';
import {
    HttpClient,
    HttpHeaders,
    HttpEventType,
    HttpParams,
} from '@angular/common/http';
import { AlertasService } from './globales/alertas.service';
import { Productos } from '../models/Productos';
import { map, catchError, tap } from 'rxjs/operators';
import { HandleErrorService } from './globales/handle-error.service';
import { Observable } from 'rxjs';
import { Comercios } from '../models/Comercios';

@Injectable({
    providedIn: 'root',
})
export class FileUploadService {
    public UrlRest: string = Endpoint.UrlRest;
    progreso = '';

    constructor(
        private http: HttpClient,
        private _auth: AuthService,
        private _alert: AlertasService,
        private he: HandleErrorService,
    ) {}

    onUpload(fd: FormData, prod: Productos, token: string): Observable<any> {
        const params = new HttpParams().set('idArt', prod.id.toString());

        return this.http
            .post(`${this.UrlRest}/files`, fd, {
                params,
                reportProgress: true,
                observe: 'events',
            })
            .pipe(catchError(this.he.handleError));
    }

    onUploadCsv(fd: FormData, idC: number): Observable<any> {
        return this.http
            .post(`${this.UrlRest}/productos/csvimport`, fd, {
                reportProgress: true,
                observe: 'events',
            })
            .pipe(catchError(this.he.handleError));
    }

    postCsv(arrProds): Observable<any> {
        return this.http
            .post(`${this.UrlRest}/productos/csvimport/post`, arrProds)
            .pipe(
                map((res) => {
                    return res;
                }),
                catchError(this.he.handleError),
            );
    }
}
