import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root",
})
export class GetFechas {
    constructor() {}

    obtenerFechaActual() {
        let hoy = new Date();

        let dia: any = hoy.getDate();
        let mes: any = hoy.getMonth() + 1;

        if (mes < 10) {
            mes = "0" + mes;
        }
        if (dia < 10) {
            dia = "0" + dia;
        }
        let anio: any = hoy.getFullYear();
        let fecha_hoy = String(anio + "-" + mes + "-" + dia);
        let fechaActual = fecha_hoy;
        return fechaActual;
    }

    obtenerHora() {
        let date = new Date();
        let segs: any = date.getSeconds();
        let mins: any = date.getMinutes();
        let hora: any = date.getHours();

        if (segs < 10) {
            segs = "0" + segs;
        }
        if (mins < 10) {
            mins = "0" + mins;
        }
        if (hora < 10) {
            hora = "0" + hora;
        }

        let hora_actual = `${hora}:${mins}:${segs}`;

        return hora_actual;
    }
}
