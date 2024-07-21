import { Injectable } from '@angular/core';
import { Suscripciones } from '../models/suscripciones.model';
import { Subject, Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HandleErrorService } from './handle-error.service';
import { Router } from '@angular/router';
import { map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

const URL = environment.url;

@Injectable({
    providedIn: 'root',
})
export class SuscripcionesService {
    private UrlRestS = URL + '/suscripciones';

    constructor(
        private http: HttpClient,
        private he: HandleErrorService,
        private router: Router,
    ) {}

    public post(susc: Suscripciones): Observable<Suscripciones> {
        return this.http.post<Suscripciones>(`${this.UrlRestS}`, susc).pipe(
            map((res) => {
                return res as Suscripciones;
            }),
            catchError(this.he.handleError),
        );
    }
}
