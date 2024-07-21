import { Component, OnInit } from "@angular/core";
import { EstadisticasService } from "src/app/services/estadisticas.service";
import { Observable } from "rxjs";
import * as moment from "moment";
import { tap } from "rxjs/operators";

@Component({
  selector: "app-estadisticas",
  templateUrl: "./estadisticas.page.html",
  styleUrls: ["./estadisticas.page.scss"],
})
export class EstadisticasPage implements OnInit {
  ganancias$: Observable<any>;
  cantPrestamos$: Observable<any>;
  cantPagos$: Observable<any>;
  prestado$: Observable<any>;
  ingresado$: Observable<any>;

  desde: any = moment().format("YYYY-MM-DDT00:00:00");
  hasta: any = moment().format("YYYY-MM-DDT00:00:00");

  get: boolean = false;

  constructor(private _est: EstadisticasService) {}

  ngOnInit() {}

  getDatos() {
    this.ganancias$ = this._est.getGanancias(this.desde, this.hasta);
    this.cantPrestamos$ = this._est.getCantPrestamos(this.desde, this.hasta);
    this.cantPagos$ = this._est.getCantPagos(this.desde, this.hasta);
    this.prestado$ = this._est.getDineroPrestado(this.desde, this.hasta);
    this.ingresado$ = this._est.getDineroIngresado(this.desde, this.hasta);
  }
}
