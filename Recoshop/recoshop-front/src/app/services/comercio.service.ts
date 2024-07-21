import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Comercio } from '../models/comercio.model';

const URL = environment.url;

@Injectable({
    providedIn: 'root',
})
export class ComercioService {
    private subjComercio = new Subject<any>();
    idComercio: any;

    constructor(private _http: HttpClient) {}

    // Observers

    returnComercio(): Observable<any> {
        return this.subjComercio.asObservable();
    }

    getComercio(): any {
        this.subjComercio.next(this.idComercio);
    }

    addComercio(comercio) {
        this.idComercio = comercio;
        this.getComercio();
    }

    // HTTP SERVICES

    getComerciosHabilitados() {
        return this._http.get(`${URL}/comercios/habilitados`);
    }
    getComercioById(Id) {
        return this._http.get(`${URL}/comercio/${Id}`);
    }
    post(comercio: Comercio) {
        return this._http.post(`${URL}/comercios`, comercio);
    }
}
