import { Injectable } from '@angular/core';
import { Endpoint } from '../endpoint';
import { HttpOptions } from './globales/httpOptions';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HandleErrorService } from './globales/handle-error.service';
import { Pedidos } from '../models/Pedidos';
import { Observable, of, Subject } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { AlertasService } from './globales/alertas.service';

@Injectable({
    providedIn: 'root',
})
export class PedidosService {
    private UrlRestS = Endpoint.UrlRest + '/pedidos';
    private UrlRest = Endpoint.UrlRest + '/pedido';

    httpOptions = HttpOptions.httpOptions;

    pedidoSubj = new Subject<Pedidos>();
    pedido: Pedidos = null;

    private pedidos: Pedidos[] = null;

    constructor(
        private http: HttpClient,
        private he: HandleErrorService,
        private _alert: AlertasService,
    ) {}

    public returnPedido(): Observable<Pedidos> {
        return this.pedidoSubj.asObservable();
    }

    public sendPedido(ped: Pedidos) {
        this.pedido = ped;
        return this.pedidoSubj.next(ped);
    }

    public get(id: number): Observable<Pedidos[]> {
        return this.http
            .get<Pedidos[]>(`${this.UrlRest}/${id}`, this.httpOptions)
            .pipe(
                map((res) => {
                    return res as Pedidos[];
                }),
                catchError(this.he.handleError),
            );
    }

    public getByEstadoAndPag(
        size: number,
        nro: number,
        est: string,
    ): Observable<Pedidos[]> {
        const params = new HttpParams()
            .set('pageSize', size.toString())
            .set('pageNro', nro.toString())
            .set('estado', est);
        return this.http
            .get<Pedidos[]>(`${this.UrlRestS}/paginado`, { params })
            .pipe(
                map((res) => {
                    return res.pedidos as Pedidos[];
                }),
                catchError(this.he.handleError),
            );
    }

    public getByEstadoAndComercioPag(
        size: number,
        nro: number,
        est: string,
        idUsuario: number,
    ): Observable<Pedidos[]> {
        const params = new HttpParams()
            .set('pageSize', String(size))
            .set('pageNro', String(nro));

        return this.http
            .get<Pedidos[]>(
                `${this.UrlRestS}/paginado/comercio/${idUsuario}/estado/${est}`,
                { params },
            )
            .pipe(
                map((res) => {
                    return res.pedidos as Pedidos[];
                }),
                catchError(this.he.handleError),
            );
    }

    public getAll(refresh: boolean): Observable<Pedidos[]> {
        if (this.pedidos != null && !refresh) {
            return of([...this.pedidos]);
        } else {
            return this.http
                .get<Pedidos[]>(`${this.UrlRestS}`, this.httpOptions)
                .pipe(
                    tap((res) => {
                        this.pedidos = res;
                    }),
                    map((res) => {
                        return res as Pedidos[];
                    }),
                    catchError(this.he.handleError),
                );
        }
    }

    public post(pedido: Pedidos): Observable<Pedidos> {
        return this.http
            .post<Pedidos>(`${this.UrlRestS}`, pedido, this.httpOptions)
            .pipe(
                map((res) => {
                    return res as Pedidos;
                }),
                catchError(this.he.handleError),
            );
    }

    public update(pedido: Pedidos): Observable<Pedidos> {
        return this.http
            .put<Pedidos>(
                `${this.UrlRest}/${pedido.id}`,
                pedido,
                this.httpOptions,
            )
            .pipe(
                map((res) => {
                    return res as Pedidos;
                }),
                catchError(this.he.handleError),
            );
    }

    public delete(id: number): Observable<Pedidos> {
        return this.http
            .delete<Pedidos>(`${this.UrlRest}/${id}`, this.httpOptions)
            .pipe(
                map((res) => {
                    return res as Pedidos;
                }),
                catchError(this.he.handleError),
            );
    }

    public changeEstado(ped, estado: string) {
        let title: string;
        let msg: string;
        this.pedido = ped;

        if (estado === 'C') {
            title = 'Está a punto de Cancelar el pedido.';
            msg = '¿Desea realmente Cancelar el Pedido?';
        } else if (estado === 'D') {
            title = 'Está a punto de Despachar el pedido.';
            msg = '¿Desea realmente Despachar el Pedido?';
        } else if (estado === 'P') {
            title = 'Está a punto de mover el pedido a Pendientes.';
            msg = '¿Desea realmente moverlo a Pendientes?';
        }

        this._alert
            .sweetConfirm(title, msg)
            .then((val) => {
                if (val) {
                    this.pedido.estado = estado;
                    this.update(this.pedido).subscribe(
                        () =>
                            this._alert.sweetSuccess(
                                '',
                                '¡Realizado con éxito!',
                            ),
                        (err) => {
                            this._alert.toastError(
                                'Se ha producido un error',
                                err,
                            );
                        },
                    );
                }
            })
            .catch((err) => console.log(err));
    }
}
