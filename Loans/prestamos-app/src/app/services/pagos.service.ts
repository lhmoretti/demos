import { Injectable } from "@angular/core";
import { Endpoint } from "../endpoint";
import { HttpOptions } from "./globales/httpOptions";
import { Pagos } from "../models/pagos";
import { Subject, Observable } from "rxjs";
import { HttpClient, HttpParams } from "@angular/common/http";
import { EndpointsService } from "./endpoints.service";
import { HandleErrorService } from "./globales/handle-error.service";
import { Router } from "@angular/router";
import { map, catchError, tap } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class PagosService {
  private UrlRestS = Endpoint.UrlRest + "/pagos";
  private UrlRest = Endpoint.UrlRest + "/pago";

  // private UrlRestS = this._ep.UrlRest + '/pagos';
  // private UrlRest = this._ep.UrlRest + '/pago';

  httpOptions = HttpOptions.httpOptions;
  private pagos: Pagos[] = null;

  pagoSubject = new Subject<Pagos>();

  constructor(
    private http: HttpClient,
    private _ep: EndpointsService,
    private he: HandleErrorService,
    private router: Router,
  ) {}

  public getByIdCliente(id: number): Observable<Pagos[]> {
    return this.http.get<Pagos[]>(`${this.UrlRestS}/cliente/${id}`).pipe(
      map((res) => {
        return <Pagos[]>res;
      }),
      catchError(this.he.handleError),
    );
  }

  public getPaginated(size: number, nro: number): Observable<Pagos[]> {
    let params = new HttpParams()
      .set("pageSize", size.toString())
      .set("pageNro", nro.toString());
    return this.http.get<Pagos[]>(`${this.UrlRestS}/paginado`, { params }).pipe(
      map((res) => {
        return <Pagos[]>res["pagos"];
      }),
      catchError(this.he.handleError),
    );
  }

  //  ====================================================================================
  public getAll() {
    return this.http.get<Pagos[]>(`${this.UrlRestS}`, this.httpOptions).pipe(
      map((res) => {
        return <Pagos[]>res;
      }),
      catchError(this.he.handleError),
    );
  }

  public get(id: number) {
    return this.http.get<Pagos>(`${this.UrlRest}/${id}`, this.httpOptions).pipe(
      map((res) => {
        return <Pagos>res;
      }),
      catchError(this.he.handleError),
    );
  }

  public update(pago: Pagos): Observable<Pagos> {
    return this.http
      .put<Pagos>(`${this.UrlRest}/${pago.id}`, pago, this.httpOptions)
      .pipe(
        map((res) => {
          return <Pagos>res;
        }),
        catchError(this.he.handleError),
      );
  }

  public post(pago: Pagos): Observable<Pagos> {
    return this.http
      .post<Pagos>(`${this.UrlRestS}`, pago, this.httpOptions)
      .pipe(
        map((res) => {
          return <Pagos>res;
        }),
        catchError(this.he.handleError),
      );
  }

  public delete(id: number): Observable<Pagos> {
    return this.http
      .delete<Pagos>(`${this.UrlRest}/${id}`, this.httpOptions)
      .pipe(
        map((res) => {
          return <Pagos>res;
        }),
        catchError(this.he.handleError),
      );
  }
}
