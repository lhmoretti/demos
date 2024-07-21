import { Component, OnInit } from '@angular/core';
import { SuscripcionesService } from 'src/app/services/suscripciones.service';
import { Suscripciones } from 'src/app/models/suscripciones.model';
import { AlertsService } from 'src/app/services/alerts.service';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit {
    suscripcion: Suscripciones = {};

    constructor(
        private _sus: SuscripcionesService,
        private _alert: AlertsService,
    ) {}

    ngOnInit(): void {}

    postSuscrip() {
        if (this.suscripcion.nombre == null || this.suscripcion.nombre == '') {
            return this._alert.toastAlert('Ingresa tu nombre', '');
        }
        if (this.suscripcion.email == null || this.suscripcion.email == '') {
            return this._alert.toastAlert('Ingresa tu email', '');
        }

        this._sus.post(this.suscripcion).subscribe(
            (data: Suscripciones) => {
                this._alert.toastSuccess('¡Suscripción exitosa!', '');
                this.suscripcion = {};
            },
            (err) => {
                console.log('Error:', err);
            },
        );
    }
}
