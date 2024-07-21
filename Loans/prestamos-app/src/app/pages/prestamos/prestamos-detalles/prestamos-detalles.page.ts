import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { Prestamos } from "src/app/models/prestamos";
import { PrestamosService } from "src/app/services/prestamos.service";
import { Router, ActivatedRoute } from "@angular/router";
import { Pagos } from "src/app/models/pagos";
import { PagosService } from "src/app/services/pagos.service";
import { ToastsService } from "src/app/services/toasts.service";
import { tap } from "rxjs/operators";
import * as moment from "moment";

@Component({
  selector: "app-prestamos-detalles",
  templateUrl: "./prestamos-detalles.page.html",
  styleUrls: ["./prestamos-detalles.page.scss"],
})
export class PrestamosDetallesPage implements OnInit {
  prestamo$: Observable<Prestamos>;
  prestamo: Prestamos;
  prestamoId: number;
  montoCuota: number;
  montoMasInteres: number;
  nro_cuota: number;
  restarAIntereses: number;
  pagoConInteres: boolean;
  fcHoy: any = moment().format();
  arrTasaInt: Array<number> = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24,
  ];
  habilitarAplicaInteres: boolean = false;
  interesAplicado: number = 10;
  ganancia: number = null;

  constructor(
    private _prestamos: PrestamosService,
    private _router: Router,
    private _actRoute: ActivatedRoute,
    private _pagos: PagosService,
    public _toast: ToastsService,
  ) {}

  ngOnInit() {
    this.prestamoId = parseInt(this._actRoute.snapshot.paramMap.get("id"));
    this.getByIdPrestamo();
  }

  getByIdPrestamo() {
    this.prestamo$ = this._prestamos.get(this.prestamoId).pipe(
      tap((p) => {
        this.prestamo = p;
        //this.valorCuota = (this.prestamo.monto + this.prestamo.intereses) / this.prestamo.cantidad_cuotas;
      }),
    );
  }

  regresar() {
    this._router.navigate(["prestamos"]);
  }

  async savePago() {
    const pago: Pagos = new Pagos();
    if (this.habilitarAplicaInteres) pago.interes = true;
    else pago.interes = false;
    pago.monto = this.montoCuota;
    pago.tasa_interes = this.interesAplicado;
    pago.ganancia = this.ganancia;
    pago.nro_cuota = this.prestamo.cuotas_pagadas + 1;
    pago.fecha_hora = this.fcHoy;
    pago.prestamoId = this.prestamoId;

    if (pago.monto === null || pago.monto === undefined) {
      return this._toast.presentToast("Completa el monto.");
    }
    if (pago.fecha_hora === null || pago.fecha_hora === undefined) {
      return this._toast.presentToast("Completa el vencimiento.");
    }

    this._pagos
      .post(pago)
      .toPromise()
      .then((res) => {
        this.updatePrestamo("P");
      })
      .catch((err) => {
        this._toast.errorToast("Error");
        console.log("Error", err);
      });
  }

  /**
   *
   * @param tipo Tipo de update(si hace un delete(D) o post(P) de pago);
   */
  async updatePrestamo(tipo?: string) {
    // Obtenemos el prestamo con el nuevo pago y luego lo actualizamos.
    this._prestamos
      .get(this.prestamoId)
      .toPromise()
      .then(async (prest) => {
        this.prestamo = prest;

        if (tipo === "P") {
          this.prestamo.cuotas_pagadas++;
        }

        this.prestamo.saldo = await this.calcSaldoPendiente(tipo);

        if (
          tipo === "P" &&
          this.habilitarAplicaInteres &&
          this.prestamo.saldo > 0
        ) {
          this.prestamo.intereses += await this.calcDiferenciaInteresXCuota();
        }

        if (
          tipo === "P" &&
          this.habilitarAplicaInteres &&
          this.prestamo.saldo < 0
        ) {
          // Actualizamos los intereses(saldo negativo que quede) y luego actualizamos el saldo a 0.
          this.prestamo.intereses += await this.calcDiferenciaInteresXCuota(); // el saldo negativo
          this.prestamo.saldo = 0;
        }

        if (tipo === "P" && this.prestamo.saldo < 0) {
          this.prestamo.saldo = 0;
        }

        if (this.prestamo.saldo === 0) {
          this.prestamo.estado = "Saldado";
        } else {
          this.prestamo.estado = "Vigente";
        }

        if (tipo === "D") {
          this.prestamo.cuotas_pagadas--;
          if (this.pagoConInteres)
            this.prestamo.intereses -= this.restarAIntereses;
        }

        this._prestamos
          .update(this.prestamo)
          .pipe(
            tap((p) => {
              this.prestamo = {};
              this.prestamo = p;
              this._toast.successToast("¡Préstamo actualizado!");
              this.clean();
              this.getByIdPrestamo();
            }),
          )
          .subscribe();
      })
      .catch((err) => {
        this._toast.errorToast("Se produjo un error");
        console.log("Error:", err);
      });
  }

  /**
   *
   * @param tipo Tipo de update(si hace un delete(D) o post(P) de pago);
   * para actualizar correctamente el saldo del prestamo
   */
  calcSaldoPendiente(tipo: string): Promise<number> {
    return new Promise<number>((resolve /*, reject */) => {
      if (tipo === "P") resolve(this.prestamo.saldo - this.montoCuota);
      else if (tipo === "D")
        if (this.pagoConInteres)
          // si el pago fue con intereses, restamos el monto del pago
          resolve(this.prestamo.saldo + this.montoCuota);
        // sino, el valor calculado de cada cuota
        else resolve(this.prestamo.saldo + this.prestamo.valor_cuota);
    });
  }

  calcDiferenciaInteresXCuota() {
    return new Promise<number>((resolve /*, reject */) => {
      // cálculo para sacar la diferencia de interés que se genera
      // al aplicar un porcentaje a una cuota
      const diferenciaInteres = this.ganancia * (this.interesAplicado / 100);
      resolve(Math.round(diferenciaInteres));
    });
  }

  calcGananciaCuota(calcInteresCuota?: string): Promise<number> {
    return new Promise<number>(async (resolve /*, reject */) => {
      if (calcInteresCuota === "si") await this.calcInteresCuota();

      // t = total a pagar del prestamo
      const t = this.prestamo.monto + this.prestamo.intereses;
      // x = total prestamo / monto de la cuota
      const x = t / this.montoCuota;
      // z = monto del prestamo / x
      const z = this.prestamo.monto / x;
      // ganancia = monto cuota - z
      const gan = Math.round(this.montoCuota - z);
      this.ganancia = gan;

      resolve(gan);
    });
  }

  // Solo si aplica intereses al pago
  calcInteresCuota(): Promise<number> {
    return new Promise<number>((resolve) => {
      const interesCuota = this.montoCuota * (this.interesAplicado / 100);
      this.montoCuota += interesCuota;
      // this.montoCuota = this.montoCuota + interesCuota;
      resolve(interesCuota);
    });
  }

  habilitarAplicaInteresFn() {
    if (!this.habilitarAplicaInteres)
      // false
      return;
    // true
    else this.calcInteresCuota();
  }

  clean() {
    this.montoCuota = null;
    this.nro_cuota = null;
    this.ganancia = null;
    this.habilitarAplicaInteres = false;
    this.pagoConInteres = false;
  }

  async deletePago(pa: Pagos) {
    const tit: string = "¡Eliminar pago!";
    const msg: string = "¿Estás seguro?";
    let alert = await this._toast.deleteToast(tit, msg);

    alert.present();
    alert.onDidDismiss().then((res) => {
      if (res.role === "cancel" || res.role === "backdrop")
        // backdrop = hace click fuera del modal
        return;
      else {
        // Como se va a eliminar, necesitamos pasarle el monto al input del pago,
        // que después lo toma para actualizar el saldo.
        this.montoCuota = pa.monto;

        // si interes == true -> calculamos lo que debemos restarle al saldo
        // pagoConInteres(bandera para distinguir si tiene interes el pago)
        if (pa.interes) {
          this.restarAIntereses = pa.ganancia * (pa.tasa_interes / 100);
          this.pagoConInteres = true;
        }

        this._pagos.delete(pa.id).subscribe(
          () => {
            this.updatePrestamo("D");
          },
          (err) => console.log(err),
        );
      }
    });
  }
}
