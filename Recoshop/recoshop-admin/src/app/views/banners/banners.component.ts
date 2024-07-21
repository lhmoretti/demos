import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Banners } from 'src/app/models/Banners';
import { BannersService } from 'src/app/services/banners.service';
import { Router } from '@angular/router';
import { AlertasService } from 'src/app/services/globales/alertas.service';

@Component({
    selector: 'app-banners',
    templateUrl: './banners.component.html',
    styleUrls: ['./banners.component.css'],
})
export class BannersComponent implements OnInit {
    banners$: Observable<Banners[]>;

    constructor(
        private _ban: BannersService,
        private _router: Router,
        private _alert: AlertasService,
    ) {}

    ngOnInit(): void {
        this.getAll();
    }

    getAll() {
        this.banners$ = this._ban.getAll();
    }

    new() {
        const b: Banners = new Banners();
        b.id = null;
        b.titulo = null;
        b.descrip = null;
        b.activo = null;
        b.url = null;
        this._router
            .navigate(['form-banner'])
            .then(() => this._ban.passBanner(b));
    }

    edit(b: Banners) {
        this._router
            .navigate(['form-banner'])
            .then(() => this._ban.passBanner(b));
    }

    delete(id: number) {
        this._alert
            .sweetConfirm('Eliminar', '¿Desea eliminar el banner?')
            .then((val: boolean) => {
                if (val) {
                    this._ban.delete(id).subscribe(
                        (data: Banners) => {
                            this._alert.toastSuccess('Eliminado con éxito', '');
                            this.getAll();
                        },
                        (err) => {
                            this._alert.toastError('Ocurrió un error', 'Error');
                            console.log(err);
                        },
                    );
                }
            });
    }

    update(b: Banners) {
        this._ban.update(b).subscribe(
            (data: Banners) => {
                this._alert.toastSuccess('Actualizado con éxito', '');
                this.getAll();
            },
            (err) => {
                this._alert.toastError('Ocurrió un error', 'Error');
                console.log(err);
            },
        );
    }
}
