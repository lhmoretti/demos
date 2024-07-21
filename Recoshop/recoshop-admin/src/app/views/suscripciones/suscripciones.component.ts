import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Suscripciones } from 'src/app/models/Suscripciones';
import { SuscripcionesService } from 'src/app/services/suscripciones.service';
import { PaginacionService } from 'src/app/services/globales/paginacion/paginacion.service';
import { tap } from 'rxjs/operators';
import { AlertasService } from 'src/app/services/globales/alertas.service';

@Component({
    selector: 'app-suscripciones',
    templateUrl: './suscripciones.component.html',
    styleUrls: ['./suscripciones.component.css'],
})
export class SuscripcionesComponent implements OnInit {
    suscripciones$: Observable<Suscripciones[]>;

    size = 10;
    nro = 0;

    constructor(
        private _sus: SuscripcionesService,
        private _pag: PaginacionService,
        private _alert: AlertasService,
    ) {}

    ngOnInit(): void {
        this.getPaginated();
    }

    pageChanged(event: { pageNro: number; pageSize: number }) {
        this.nro = event.pageNro;
        this.size = event.pageSize;
        this.getPaginated();
    }

    getPaginated() {
        this.suscripciones$ = this._sus.getPaginated(this.size, this.nro).pipe(
            tap((data) => {
                if (data.length === 0) {
                    this._pag.setBlockBtn(true);
                } else {
                    this._pag.setBlockBtn(false);
                }
            }),
        );
    }

    delete(id: number) {
        this._alert.sweetDelete().then((res) => {
            if (res) {
                this._sus.delete(id).subscribe(
                    () => {
                        this._alert.sweetSuccess('¡Eliminado con éxito!', '');
                        this.getPaginated();
                    },
                    (err) => {
                        this._alert.toastError('Intente nuevamente', 'Error');
                        console.error(err);
                    },
                );
            }
        });
    }
}
