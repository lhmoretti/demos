import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Pedido } from '../models/pedido.model';
import { map, catchError } from 'rxjs/operators';

const URL = environment.url;

@Injectable({
    providedIn: 'root',
})
export class PedidosService {
    constructor(private _http: HttpClient) {}

    post(pedido: Pedido) {
        return this._http.post(`${URL}/pedidos`, pedido);
    }

    getPedidosByUserPaginados(Id, nroPage, sizePage) {
        let params = new HttpParams();
        params = params.append('pageNro', nroPage.toString());
        params = params.append('pageSize', sizePage.toString());
        return this._http.get(`${URL}/pedidos/paginado/usuario/${Id}`, {
            params,
        });
    }

    getPedidosById(id: any) {
        return this._http.get(`${URL}/pedido/${id}`);
    }
}
