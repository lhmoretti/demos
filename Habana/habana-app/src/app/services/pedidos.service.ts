import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { Pedido } from "../models/Pedidos.models";
import { Observable } from "rxjs";
import { Socket } from "ngx-socket-io";

const urlRest = `${environment.urlRest}`;

@Injectable({
    providedIn: "root",
})
export class PedidosService {
    pedidos = this.socket.fromEvent<Pedido[]>("getAll");

    constructor(private socket: Socket, private _http: HttpClient) {}

    adviceUpdateOrders(msg: any[]) {
        this.socket.emit("getAll", msg);
    }

    getPedidoById(id: any) {
        return this._http.get(`${urlRest}/pedido/${id}`).pipe(
            map((res) => {
                return <Pedido>res;
            })
        );
    }

    update(pedido: Pedido): Observable<Pedido> {
        return this._http.put(`${urlRest}/pedidos`, pedido).pipe(
            map((res) => {
                return <Pedido>res;
            })
        );
    }

    getAll(): Observable<Pedido[]> {
        return this._http.get<Pedido[]>(`${urlRest}/pedidos`).pipe(
            map((res) => {
                return <Pedido[]>res;
            })
        );
    }

    postPedido(pedido: Pedido) {
        return this._http.post(`${urlRest}/pedidos`, pedido);
    }

    delete(id: number): Observable<Pedido> {
        return this._http.delete<Pedido>(`${urlRest}/pedido/${id}`).pipe(
            map((res) => {
                return <Pedido>res;
            })
        );
    }

    deleteAll(): Observable<Pedido[]> {
        return this._http.delete<Pedido[]>(`${urlRest}/pedidos/deleteAll`).pipe(
            map((res) => {
                return <Pedido[]>res;
            })
        );
    }
}
