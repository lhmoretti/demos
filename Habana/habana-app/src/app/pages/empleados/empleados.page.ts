import { Component, OnInit } from "@angular/core";
import { EmpleadosService } from "src/app/services/empleados.service";
import { Empleados } from "src/app/models/Empleados.model";
import { NavController } from "@ionic/angular";
import { Router } from "@angular/router";
import { ToastsService } from "src/app/services/toasts.service";

@Component({
    selector: "app-empleados",
    templateUrl: "./empleados.page.html",
    styleUrls: ["./empleados.page.scss"],
})
export class EmpleadosPage implements OnInit {
    arrEmpleados: Empleados[] = [];

    constructor(
        private empService: EmpleadosService,
        private router: Router,
        private toastService: ToastsService
    ) {}

    ngOnInit() {}

    async ionViewWillEnter() {
        await this.toastService.mostrarLoading();
        this.obtenerEmpleados();
    }

    obtenerEmpleados() {
        this.empService.getAllEmpleados().subscribe(
            (data) => {
                if (data.length === 0)
                    this.toastService.alertToast(
                        "No se encontraron empleados."
                    );
                else this.arrEmpleados = data;
                this.toastService.esconderLoading();
            },
            (err) => {
                this.toastService.errorToast("Error");
                console.log(err);
            }
        );
    }

    edit(id) {
        this.router.navigate(["main/empleados/crud-empleados", id]);
    }

    async delete(emp: Empleados) {
        let tit: string = "Eliminar usuario";
        let msg: string = `¿Desea eliminar el usuario ${emp.nombre} ${emp.apellido}?`;
        let alert = await this.toastService.deleteToast(tit, msg);

        alert.present();
        alert.onDidDismiss().then((res) => {
            if (res.role === "cancel") return;
            else
                this.empService.deleteEmpleado(emp._id).subscribe(
                    () => {
                        this.toastService.successToast(
                            "¡Empleado eliminado correctamente!"
                        );
                        this.obtenerEmpleados();
                    },
                    (err) => {
                        this.toastService.errorToast("Error");
                        console.log(err);
                    }
                );
        });
    }
}
