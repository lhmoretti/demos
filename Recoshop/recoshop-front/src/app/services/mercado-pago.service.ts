import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class MercadoPagoService {
    urlApi = `${environment.url}/mercadopago/gencheckout`;

    constructor(private http: HttpClient) {}

    generarCheckout(body: any) {
        return this.http.post(`${this.urlApi}`, body);
    }
}
