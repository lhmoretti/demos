import { Injectable } from "@angular/core";
import { Endpoint } from "../endpoint";
import { HttpOptions } from "./globales/httpOptions";
import { HttpClient } from "@angular/common/http";
import { HandleErrorService } from "./globales/handle-error.service";
import { map, catchError } from "rxjs/operators";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class EstadisticasService {
  private UrlRest = Endpoint.UrlRest + "/estadisticas";

  httpOptions = HttpOptions.httpOptions;

  constructor(
    private http: HttpClient,
    private he: HandleErrorService,
  ) {}

  public getGanancias(desde: string, hasta: string): Observable<any> {
    return this.http
      .get<
        any[]
      >(`${this.UrlRest}/ganancias/desde/${desde}/hasta/${hasta}`, this.httpOptions)
      .pipe(
        map((res) => {
          console.log("gan", res);
          return <any[]>res;
        }),
        catchError(this.he.handleError),
      );
  }

  public getCantPrestamos(desde: string, hasta: string): Observable<any> {
    return this.http
      .get<
        any[]
      >(`${this.UrlRest}/prestamos/desde/${desde}/hasta/${hasta}`, this.httpOptions)
      .pipe(
        map((res) => {
          console.log("cant", res);
          return <any[]>res;
        }),
        catchError(this.he.handleError),
      );
  }

  public getCantPagos(desde: string, hasta: string): Observable<any> {
    return this.http
      .get<
        any[]
      >(`${this.UrlRest}/pagos/desde/${desde}/hasta/${hasta}`, this.httpOptions)
      .pipe(
        map((res) => {
          console.log("cant", res);
          return <any[]>res;
        }),
        catchError(this.he.handleError),
      );
  }

  public getDineroPrestado(desde: string, hasta: string): Observable<any> {
    return this.http
      .get<
        any[]
      >(`${this.UrlRest}/prestado/desde/${desde}/hasta/${hasta}`, this.httpOptions)
      .pipe(
        map((res) => {
          console.log("pres", res);
          return <any[]>res;
        }),
        catchError(this.he.handleError),
      );
  }

  public getDineroIngresado(desde: string, hasta: string): Observable<any> {
    return this.http
      .get<
        any[]
      >(`${this.UrlRest}/ingresado/desde/${desde}/hasta/${hasta}`, this.httpOptions)
      .pipe(
        map((res) => {
          console.log("ing", res);
          return <any[]>res;
        }),
        catchError(this.he.handleError),
      );
  }
}
