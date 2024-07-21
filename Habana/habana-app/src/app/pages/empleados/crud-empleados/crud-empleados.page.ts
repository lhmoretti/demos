import { Component, OnInit } from "@angular/core";
import { Empleados } from "src/app/models/Empleados.model";
import { EmpleadosService } from "src/app/services/empleados.service";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastsService } from "src/app/services/toasts.service";
import { NgForm } from "@angular/forms";

@Component({
    selector: "app-crud-empleados",
    templateUrl: "./crud-empleados.page.html",
    styleUrls: ["./crud-empleados.page.scss"],
})
export class CrudEmpleadosPage implements OnInit {
    Empleado: Empleados = {};
    id: any;
    showActualizar: boolean = false;

    constructor(
        private empService: EmpleadosService,
        private actRouter: ActivatedRoute,
        private toastService: ToastsService,
        private router: Router
    ) {}

    ngOnInit() {
        this.id = this.actRouter.snapshot.paramMap.get("id");
        if (this.id != 0) {
            this.showActualizar = true;
            this.obtenerUsuario();
        } else {
            this.showActualizar = false;
            this.Empleado.activo = true;
        }
    }

    obtenerUsuario() {
        this.empService.getByIdEmpleado(this.id).subscribe((data) => {
            delete data.password;
            this.Empleado = data;
        });
    }

    enviarEmpleado(form: NgForm) {
        const pass: string = form.controls["password"].value;

        if (this.id == 0) {
            // COMPROBACION PARA POST DE USER
            if (form.invalid)
                return this.toastService.errorToast(
                    "Todos los campos son obligatorios"
                );
            else if (pass.length <= 8)
                return this.toastService.errorToast(
                    "La contraseña debe tener al menos 8 caracteres"
                );

            this.empService.postEmpleado(this.Empleado).subscribe(
                (data) => {
                    if (data.error) this.toastService.errorToast(`${data.msg}`);
                    else
                        this.router.navigate(["/main/empleados"]).then(() => {
                            this.toastService.successToast(
                                "¡Agregado correctamente!"
                            );
                        });
                },
                (err) => {
                    this.toastService.errorToast(`${err.msg}`);
                }
            );
        } else {
            // COMPROBACION PARA POST DE USER

            if (pass === undefined || pass === "") {
                form.controls["password"].setValue(null);
                form.controls["password"].setErrors(null);
            }

            if (pass)
                if (pass.length <= 8)
                    return this.toastService.errorToast(
                        "La contraseña debe tener al menos 8 caracteres"
                    );

            if (form.invalid)
                return this.toastService.errorToast(
                    "Todos los campos son obligatorios"
                );

            this.empService.updateEmpleado(this.Empleado).subscribe(
                (data) => {
                    if (data.error) this.toastService.errorToast(`${data.msg}`);
                    else
                        this.router.navigate(["/main/empleados"]).then(() => {
                            this.toastService.successToast(
                                "¡Actualizado correctamente!"
                            );
                        });
                },
                (err) => {
                    this.toastService.errorToast(`${err.msg}`);
                }
            );
        }
    }
}
