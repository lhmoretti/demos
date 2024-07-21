import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root',
})
export class AlertsService {
    constructor(private toastr: ToastrService, private router: Router) {}

    alertSuccess(titulo: string, texto: string) {
        Swal.fire({
            icon: 'success',
            title: titulo,
            text: texto,
        });
    }

    alertComercioRegistrado(titulo: string, texto: string) {
        Swal.fire({
            icon: 'success',
            title: titulo,
            text: texto,
            showCancelButton: true,
            confirmButtonColor: '#e7600f',

            confirmButtonText: '¡Ir a vender!',
            cancelButtonText: '¡Quedarme a comprar!',
        }).then((result) => {
            if (result.value) {
                window.open('https://www.your-domain.com.ar/admin/');
                return null;
            } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
            ) {
                this.router.navigate(['inicio']).then((resp) => {
                    location.reload();
                });
            }
        });
    }

    alertDanger(titulo: string, texto: string) {
        Swal.fire({
            icon: 'error',
            title: titulo,
            text: texto,
        });
    }

    alertAddProd() {
        const toast = Swal.mixin({
            toast: true,
            showConfirmButton: false,
            position: 'top',
            timer: 1000,
        });

        toast.fire({
            icon: 'success',
            text: ' ¡Agregado!',
        });
    }

    public toastSuccess(msg1, msg2) {
        this.toastr.success(`${msg1}`, `${msg2}`);
    }

    public toastError(msg1, msg2) {
        this.toastr.error(`${msg1}`, `${msg2}`);
    }

    public toastAlert(msg1, msg2) {
        this.toastr.info(`${msg1}`, `${msg2}`);
    }

    public toastErrorSession(msg1, msg2) {
        this.toastr.error(`${msg1}`, `${msg2}`);
    }
}
