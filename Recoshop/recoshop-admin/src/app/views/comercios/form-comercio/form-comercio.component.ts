import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { ComerciosService } from '../../../services/comercios.service';
import { Validators, FormBuilder } from '@angular/forms';
import { Subscription, Observable } from 'rxjs';
import { Comercios, ComerciosJson } from 'src/app/models/Comercios';
import { AlertasService } from 'src/app/services/globales/alertas.service';
import { Usuarios } from 'src/app/models/Usuarios';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
    selector: 'app-form-comercio',
    templateUrl: './form-comercio.component.html',
    styleUrls: ['./form-comercio.component.css'],
})
export class FormComerciosComponent implements OnInit, OnDestroy {
    public planes: any[] = [
        {
            plan: 'Negocio',
        },
        {
            plan: 'Corporativo',
        },
        {
            plan: 'Empresa',
        },
    ];

    idPrivilegio: number;
    idUsuario: number;
    idComercio: number;

    showForm: boolean;
    comercioFM: Comercios = ComerciosJson.ComerciosJson;

    arrUsuarios: Usuarios[] = [];
    usuarios: Usuarios[] = [];
    // usuario: Usuarios;

    userSubs: Subscription;
    formSubs: Subscription;

    constructor(
        private _auth: AuthService,
        private _alert: AlertasService,
        private _comercios: ComerciosService,
        private _usuarios: UsuariosService,
    ) {
        this.userSubs = this._comercios
            .obsUser()
            .subscribe((data: Comercios) => {
                if (!data || data === null) {
                    // comercio nuevo
                    const com = ComerciosJson.ComerciosJson;
                    this.comercioFM = com;
                    return;
                }
                // asignar comercio recibido
                this.comercioFM = data;
            });

        this.formSubs = this._comercios
            .obsForm()
            .subscribe((data: boolean) => (this.showForm = data));
    }

    async ngOnInit() {
        this.idUsuario = await this._auth.returnIdUsuario();
        this.idPrivilegio = await this._auth.returnRole();
        this.getAllUsuarios();
    }

    ngOnDestroy(): void {
        this.userSubs.unsubscribe();
        this.formSubs.unsubscribe();
    }

    getAllUsuarios() {
        this._usuarios.getAll().subscribe(
            (data: Usuarios[]) => {
                this.arrUsuarios = data;
            },
            (err) => console.log(err),
        );
    }

    asignarUsuarios() {
        const u: any[] = [];
        u.push(this.usuarios);
        for (const i of u) {
            delete i.comercios;
            delete i.created_at;
            delete i.updated_at;
        }
        this.comercioFM.usuarios = u;
    }

    send() {
        const id = this.comercioFM.id;
        id === null ? this.post() : this.update();
    }

    update() {
        console.log('this.comercioFM', this.comercioFM);

        this._comercios.update(this.comercioFM).subscribe(
            (data: Comercios) => {
                if (data.id) {
                    this._alert.sweetSuccess('', '¡Modificado correctamente!');
                }
            },
            (err) => {
                console.log('error', err);
                this._alert.toastError('', 'Lo sentimos');
            },
        );
    }

    post() {
        // console.log('POST this.comercioFM', this.comercioFM);
        this._comercios.post(this.comercioFM).subscribe(
            (data: Comercios) => {
                if (data.id) {
                    this._alert.sweetSuccess('', '¡Agregado correctamente!');
                }
            },
            (err) => {
                console.log('error', err);
                this._alert.toastError('', 'Lo sentimos');
            },
        );
    }

    compareFn(c1: any, c2: any): boolean {
        return c1 && c2 ? c1.id === c2.id : c1 === c2;
    }

    comparePlan(c1: any, c2: any): boolean {
        return c1 && c2 ? c1 === c2 : c1 === c2;
    }
}
