import { Component, OnInit } from '@angular/core';
import { Observable, from, of } from 'rxjs';
import { AlertasService } from 'src/app/services/globales/alertas.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { tap, map, take, find, filter } from 'rxjs/operators';
import { ComerciosService } from 'src/app/services/comercios.service';
import { Comercios } from 'src/app/models/Comercios';

@Component({
    selector: 'app-formas-pago',
    templateUrl: './formas-pago.component.html',
    styleUrls: ['./formas-pago.component.css'],
})
export class FormasPagoComponent implements OnInit {
    idUsuario: number;
    idComercio: number;
    idPrivilegio: number;

    comercios$: Observable<Comercios[]>;
    comercio$: Observable<Comercios>;
    source: Observable<Comercios>;

    constructor(
        private _comercios: ComerciosService,
        private _alert: AlertasService,
        private _auth: AuthService,
    ) {}

    async ngOnInit() {
        this.idUsuario = await this._auth.returnIdUsuario();
        this.idPrivilegio = await this._auth.returnRole();
        this.getComerciosByUsuario();
    }

    // ====================================================================
    // Obtenemos los comercios, dependiendo si es el Admin o un vendedor
    getComerciosByUsuario() {
        if (this.idPrivilegio == 1) {
            // admin
            // buscamos TODOS los comercios Habilitados
            this.comercios$ = this._comercios
                .getComerciosHabilitados()
                .pipe(tap((data: Comercios[]) => this.checkComercios(data)));
        } else {
            // vendedor
            // buscamos los comercios asociados al usuario
            this.comercios$ = this._comercios
                .getComerciosByIdUsuario(this.idUsuario)
                .pipe(
                    tap((data: Comercios[]) => {
                        console.log(data);

                        this.checkComercios(data);
                    }),
                );
        }
    }

    send(com: Comercios) {
        this._comercios
            .update(com)
            .toPromise()
            .then((res) => {
                this._alert.toastSuccess('', '¡Guardado con éxito!');
            })
            .catch((err) => {
                this._alert.toastError(
                    'Lo sentimos, vuelve a intentarlo',
                    'Error',
                );
                console.log(err);
            });
    }

    // ====================================================================
    checkComercios(data: Comercios[]) {
        if (data.length == 0) {
            this._alert.toastAlert(
                'Actualmente no hay comercios habilitados',
                '',
            );
            return;
        }

        this.idComercio = data[0].id;
        this.source = from(data);
        this.comercio$ = this.source.pipe(take(1));
    }

    // Se ejecuta cuando se cambia de comercio
    changeComercio() {
        this.comercio$ = this.source.pipe(
            filter((c: Comercios) => c.id === this.idComercio),
        );
    }
}
