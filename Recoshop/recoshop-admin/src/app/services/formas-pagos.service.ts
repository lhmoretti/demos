// import { Injectable } from '@angular/core';
// import { Endpoint } from '../endpoint';
// import { HttpOptions } from './globales/httpOptions';
// import { ModoPagos } from '../models/ModoPagos';
// import { HttpClient } from '@angular/common/http';
// import { HandleErrorService } from './globales/handle-error.service';
// import { Observable, of } from 'rxjs';
// import { map, catchError, tap } from 'rxjs/operators';

// @Injectable({
//   providedIn: 'root'
// })
// export class ModoPagosService {

//   private UrlRestS = Endpoint.UrlRest + '/modopagos';
//   private UrlRest = Endpoint.UrlRest + '/modopago';

//   httpOptions = HttpOptions.httpOptions;

//   private modopagos: ModoPagos[] = null;

//   constructor(
//     private http: HttpClient,
//     private he: HandleErrorService) {

//   }

//   public refresh() {
//     this.modopagos = [];
//     this.modopagos = null;
//     this.getAll(true);
//   }

//   //  ====================================================================================
//   public get(id: number): Observable<ModoPagos[]> {
//     return this.http.get<ModoPagos[]>(`${this.UrlRest}/${id}`, this.httpOptions)
//       .pipe(
//         map(res => { return <ModoPagos[]>res; }),
//         catchError(this.he.handleError)
//       );
//   }

//   public getAll(refresh: boolean): Observable<ModoPagos[]> {
//     if (this.modopagos != null && !refresh) {
//       return of([... this.modopagos]);
//     } else {
//       return this.http.get<ModoPagos[]>(`${this.UrlRestS}`, this.httpOptions)
//         .pipe(
//           tap(res => { this.modopagos = <ModoPagos[]>res; }),
//           map(res => { return <ModoPagos[]>res; }),
//           catchError(this.he.handleError)
//         );
//     }
//   }

//   public post(modopago: ModoPagos): Observable<ModoPagos> {
//     return this.http.post<ModoPagos>(`${this.UrlRestS}`, modopago, this.httpOptions)
//       .pipe(
//         map(res => { return <ModoPagos>res; }),
//         catchError(this.he.handleError)
//       );
//   }

//   public update(modopago: ModoPagos): Observable<ModoPagos> {
//     return this.http.put<ModoPagos>(`${this.UrlRest}/${modopago.id}`, modopago, this.httpOptions)
//       .pipe(
//         map(res => { return <ModoPagos>res; }),
//         catchError(this.he.handleError)
//       );
//   }

//   public delete(id: number): Observable<ModoPagos> {
//     return this.http.delete<ModoPagos>(`${this.UrlRest}/${id}`, this.httpOptions)
//       .pipe(
//         map(res => { return <ModoPagos>res; }),
//         catchError(this.he.handleError)
//       );
//   }

//   //  ====================================================================================
//   public getModoPagosByIdComercio(idCom: number): Observable<ModoPagos[]> {
//     return this.http.get<ModoPagos[]>(`${this.UrlRestS}/comercio/${idCom}`, this.httpOptions)
//       .pipe(
//         map(res => { return <ModoPagos[]>res; }),
//         catchError(this.he.handleError)
//       );
//   }

//   public getModoPagosByIdComercioActivos(idCom: number): Observable<ModoPagos[]> {
//     return this.http.get<ModoPagos[]>(`${this.UrlRestS}/comercio/${idCom}/activos`, this.httpOptions)
//       .pipe(
//         map(res => { return <ModoPagos[]>res; }),
//         catchError(this.he.handleError)
//       );
//   }
// }
