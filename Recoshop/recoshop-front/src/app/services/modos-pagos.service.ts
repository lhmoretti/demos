import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const URL = environment.url;

@Injectable({
    providedIn: 'root',
})
export class ModosPagosService {
    constructor(private _http: HttpClient) {}

    getModosPagos() {
        return this._http.get(`${URL}/modopagos`);
    }
}
