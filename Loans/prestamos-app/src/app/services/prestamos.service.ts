import { Injectable } from "@angular/core";
import { Endpoint } from "../endpoint";
import { HttpOptions } from "./globales/httpOptions";
import { Prestamos } from "../models/prestamos";
import { Subject, Observable } from "rxjs";
import { HttpClient, HttpParams } from "@angular/common/http";
import { EndpointsService } from "./endpoints.service";
import { HandleErrorService } from "./globales/handle-error.service";
import { Router } from "@angular/router";
import { map, catchError } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class PrestamosService {
  private UrlRestS = Endpoint.UrlRest + "/prestamos";
  private UrlRest = Endpoint.UrlRest + "/prestamo";

  // private UrlRestS = this._ep.UrlRest + '/prestamos';
  // private UrlRest = this._ep.UrlRest + '/prestamo';

  httpOptions = HttpOptions.httpOptions;
  private prestamos: Prestamos[] = null;

  prestamo: Prestamos;
  prestamoSubject = new Subject<Prestamos>();

  constructor(
    private http: HttpClient,
    private _ep: EndpointsService,
    private he: HandleErrorService,
    private router: Router,
  ) {}

  public getByIdCliente(id: number): Observable<Prestamos[]> {
    return this.http.get<Prestamos[]>(`${this.UrlRestS}/cliente/${id}`).pipe(
      map((res) => {
        return <Prestamos[]>res;
      }),
      catchError(this.he.handleError),
    );
  }

  public getPaginated(
    size: number,
    nro: number,
    estado: string,
    order: string,
    ad: any,
  ): Observable<Prestamos[]> {
    let params = new HttpParams()
      .set("pageSize", size.toString())
      .set("pageNro", nro.toString())
      .set("estado", estado)
      .set("order", order)
      .set("ad", ad);
    return this.http
      .get<Prestamos[]>(`${this.UrlRestS}/paginado`, { params })
      .pipe(
        map((res) => {
          return <Prestamos[]>res["prestamos"];
        }),
        catchError(this.he.handleError),
      );
  }

  //  ====================================================================================
  public getAll() {
    console.log("Endpoint.UrlRest SERVICE", this.UrlRest);
    return this.http
      .get<Prestamos[]>(`${this.UrlRestS}`, this.httpOptions)
      .pipe(
        map((res) => {
          return <Prestamos[]>res;
        }),
        catchError(this.he.handleError),
      );
  }

  public get(id: number) {
    return this.http
      .get<Prestamos>(`${this.UrlRest}/${id}`, this.httpOptions)
      .pipe(
        map((res) => {
          return <Prestamos>res;
        }),
        catchError(this.he.handleError),
      );
  }

  public update(prestamo: Prestamos): Observable<Prestamos> {
    return this.http
      .put<Prestamos>(
        `${this.UrlRest}/${prestamo.id}`,
        prestamo,
        this.httpOptions,
      )
      .pipe(
        map((res) => {
          return <Prestamos>res;
        }),
        catchError(this.he.handleError),
      );
  }

  public post(prestamo: Prestamos): Observable<Prestamos> {
    return this.http
      .post<Prestamos>(`${this.UrlRestS}`, prestamo, this.httpOptions)
      .pipe(
        map((res) => {
          return <Prestamos>res;
        }),
        catchError(this.he.handleError),
      );
  }

  public delete(id: number): Observable<Prestamos> {
    return this.http
      .delete<Prestamos>(`${this.UrlRest}/${id}`, this.httpOptions)
      .pipe(
        map((res) => {
          return <Prestamos>res;
        }),
        catchError(this.he.handleError),
      );
  }
}
