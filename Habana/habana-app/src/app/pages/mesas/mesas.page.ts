import { Component, OnInit } from "@angular/core";
import { MesasService } from "src/app/services/mesas.service";
import { Mesas } from "src/app/models/Mesas.model";
import { ToastsService } from "src/app/services/toasts.service";

@Component({
    selector: "app-mesas",
    templateUrl: "./mesas.page.html",
    styleUrls: ["./mesas.page.scss"],
})
export class MesasPage implements OnInit {
    arrMesas: Mesas[] = [];
    Mesa: Mesas = {};
    btnDisabled: boolean = false;

    constructor(
        private mesService: MesasService,
        private toastService: ToastsService
    ) {}

    ngOnInit() {
        this.obtenerMesas();
    }

    obtenerMesas() {
        this.mesService.getMesas().subscribe((data) => {
            this.arrMesas = data;
        });
    }

    agregarMesa() {
        this.btnDisabled = true;
        let cantMesas = this.arrMesas.length;

        if (cantMesas == 0) this.Mesa.numero = 1;

        cantMesas = cantMesas + 1;
        this.Mesa.numero = cantMesas;
        this.Mesa.estado = "L";

        this.mesService.agregarMesa(this.Mesa).subscribe((data) => {
            this.btnDisabled = false;
            this.obtenerMesas();
            this.toastService.successToast("¡Mesa agregada con éxito!");
        });
    }

    delete(id) {
        this.mesService.eliminarMesa(id).subscribe((data) => {
            this.obtenerMesas();
            this.toastService.successToast("¡Mesa eliminada con éxito!");
        });
    }
}
