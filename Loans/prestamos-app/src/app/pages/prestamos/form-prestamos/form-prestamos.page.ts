import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
  OnDestroy,
} from "@angular/core";
import { Prestamos } from "src/app/models/prestamos";
import { Subscription, fromEvent } from "rxjs";
import { ClientesService } from "src/app/services/clientes.service";
import { Clientes } from "src/app/models/clientes";
import { ToastsService } from "src/app/services/toasts.service";
import { PrestamosService } from "src/app/services/prestamos.service";
import { Router } from "@angular/router";
import * as moment from "moment";
import { debounceTime, distinctUntilChanged, tap } from "rxjs/operators";

@Component({
  selector: "app-form-prestamos",
  templateUrl: "./form-prestamos.page.html",
  styleUrls: ["./form-prestamos.page.scss"],
})
export class FormPrestamosPage implements OnInit, OnDestroy {
  prestamo: Prestamos;
  cliSubs: Subscription;
  int_x_cuota: number;
  cuotas_de: number;

  fcHoy: any = moment().format();
  fcVence: any;
  arrCuotas: Array<number> = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24,
  ];
  arrTasaInt: Array<number> = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24,
  ];

  evtSus: Subscription;
  @ViewChild("monto", { read: ElementRef }) monto: ElementRef;
  @ViewChild("fijaCuo", { read: ElementRef }) fijaCuo: ElementRef;

  constructor(
    private _cliente: ClientesService,
    private _toast: ToastsService,
    private _prestamo: PrestamosService,
    private _router: Router,
  ) {
    this.cliSubs = this._cliente.obsUser().subscribe((cliente: Clientes) => {
      this.prestamo = new Prestamos();
      this.prestamo.id = null;
      this.prestamo.monto = null;
      this.prestamo.fecha_hora = this.fcHoy;
      this.prestamo.vencimiento = null;
      this.prestamo.tasa_interes = 10;
      this.prestamo.intereses = null;
      this.prestamo.cantidad_cuotas = 6;
      this.prestamo.cuotas_pagadas = 0;
      this.prestamo.tipo_pago = "Mensual";
      this.prestamo.saldo = null;
      this.prestamo.estado = "Vigente";
      this.prestamo.clienteId = cliente;

      this.calcFcVenc();
    });
  }

  ngOnInit() {}

  ionViewWillEnter() {
    this.evtSus = fromEvent(this.monto.nativeElement, "keyup")
      .pipe(
        debounceTime(450),
        distinctUntilChanged(),
        tap(() => {
          this.calcIntereses();
        }),
      )
      .subscribe();

    this.evtSus = fromEvent(this.fijaCuo.nativeElement, "keyup")
      .pipe(
        debounceTime(450),
        distinctUntilChanged(),
        tap(() => {
          this.calcInteresesModif();
        }),
      )
      .subscribe();
  }

  ngOnDestroy() {
    this.evtSus.unsubscribe();
    this.cliSubs.unsubscribe();
  }

  post() {
    if (this.prestamo.monto == null || this.prestamo.monto == undefined)
      return this._toast.presentToast("Completa el monto.");
    if (
      this.prestamo.fecha_hora == null ||
      this.prestamo.fecha_hora == undefined
    )
      return this._toast.presentToast("Completa la Fecha y hora.");
    if (
      this.prestamo.vencimiento == null ||
      this.prestamo.vencimiento == undefined
    )
      return this._toast.presentToast("Completa el vencimiento.");
    if (
      this.prestamo.tasa_interes === null ||
      this.prestamo.tasa_interes === undefined
    )
      return this._toast.presentToast("Completa la tasa de interés.");
    if (this.prestamo.intereses == null || this.prestamo.intereses == undefined)
      return this._toast.presentToast("Completa los intereses.");

    this.prestamo.valor_cuota =
      this.prestamo.saldo / this.prestamo.cantidad_cuotas;

    this._prestamo.post(this.prestamo).subscribe(
      (data) => {
        console.log("Prestamo cargado con éxito");
        this._toast.presentToast("Préstamo cargado con éxito");
        this.clean();
        this._router.navigate(["prestamos"]);
      },
      (err) => {
        console.log("Error:", err);
        this._toast.presentToast(err);
      },
    );
  }

  clean() {
    this.prestamo.monto = null;
    this.prestamo.fecha_hora = null;
    this.prestamo.vencimiento = null;
    this.prestamo.tasa_interes = null;
    this.prestamo.intereses = null;
    this.prestamo.cantidad_cuotas = null;
    this.prestamo.tipo_pago = null;
    this.prestamo.estado = null;
  }

  async calcIntereses() {
    // Cálculo de ganancia total(intereses):
    this.prestamo.intereses = await this.intereses();
    // Cálculo de ganancia por cada cuota de los intereses:
    this.int_x_cuota = await this.intPorCuota();
    // Saldo: Monto del prestamo + los intereses
    this.prestamo.saldo = await this.saldo();
    // Cuotas que deberá pagar
    this.cuotas_de = await this.cuotasDe();
  }

  async calcInteresesModif() {
    // Cálculo de ganancia total(intereses) pero CUOTAS FIJADAS A MANO(para redondear montos):
    this.prestamo.intereses = await this.intereses(true);
    // Cálculo de ganancia por cada cuota de los intereses:
    this.int_x_cuota = await this.intPorCuota();
    // ganancia total
    this.prestamo.saldo = await this.saldo(true);
  }

  calcFcVenc() {
    let meses: number = this.prestamo.cantidad_cuotas;
    this.fcVence = moment()
      .add(Number(meses), "months")
      .format("YYYY-MM-DDTHH:ss");
    this.prestamo.vencimiento = this.fcVence;
  }

  intereses(manual?: boolean): Promise<number> {
    return new Promise((resolve /*reject */) => {
      // Cálculo de ganancia total(intereses):
      if (manual) {
        // si fija las cuotas manualmente realizamos el siguiente cálculo
        resolve(
          Math.round(
            this.cuotas_de * this.prestamo.cantidad_cuotas -
              this.prestamo.monto,
          ),
        );
      } else {
        let ti: number = this.prestamo.tasa_interes / 100;
        resolve(
          Math.round(this.prestamo.monto * ti * this.prestamo.cantidad_cuotas),
        );
      }
    });
  }

  saldo(manual?: boolean): Promise<number> {
    return new Promise((resolve /*reject */) => {
      // Saldo: Monto del prestamo + los intereses
      if (manual) {
        // si fija las cuotas manualmente realizamos el siguiente cálculo
        resolve(Math.round(this.cuotas_de * this.prestamo.cantidad_cuotas));
      } else {
        resolve(Math.round(this.prestamo.monto + this.prestamo.intereses));
      }
    });
  }

  intPorCuota(): Promise<number> {
    return new Promise((resolve /*reject */) => {
      // Cálculo de ganancia por cada cuota de los intereses:
      resolve(
        Math.round(this.prestamo.intereses / this.prestamo.cantidad_cuotas),
      );
    });
  }

  cuotasDe(): Promise<number> {
    return new Promise((resolve /*reject */) => {
      // Cuotas que deberá pagar
      resolve(Math.round(this.prestamo.saldo / this.prestamo.cantidad_cuotas));
    });
  }

  calcularCuotas() {
    if (this.prestamo.tipo_pago === "Mensual")
      this.prestamo.cantidad_cuotas = this.prestamo.cantidad_cuotas / 2;
    else this.prestamo.cantidad_cuotas = this.prestamo.cantidad_cuotas * 2;
  }
}
