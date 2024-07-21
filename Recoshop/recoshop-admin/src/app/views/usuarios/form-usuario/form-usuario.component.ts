import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { UsuariosService } from '../../../services/usuarios.service';
import { Subscription } from 'rxjs';
import { Usuarios, UsuariosForm } from 'src/app/models/Usuarios';
import { AlertasService } from 'src/app/services/globales/alertas.service';

@Component({
    selector: 'app-form-usuario',
    templateUrl: './form-usuario.component.html',
    styleUrls: ['./form-usuario.component.css'],
})
export class FormUsuarioComponent implements OnInit, OnDestroy {
    showForm: boolean;
    usuarioFM = this._userForm.UsuariosForm;

    userSubs: Subscription;
    formSubs: Subscription;

    constructor(
        private _userForm: UsuariosForm,
        private _alert: AlertasService,
        private _usuarios: UsuariosService,
    ) {
        this.userSubs = this._usuarios.obsUser().subscribe((data: Usuarios) => {
            if (!data || data === null) {
                this.usuarioFM.reset();
                return;
            }

            this.usuarioFM.setValue(data);
        });

        this.formSubs = this._usuarios
            .obsForm()
            .subscribe((data: boolean) => (this.showForm = data));
    }

    ngOnInit() {
        this._usuarios.returnUser();
    }

    ngOnDestroy(): void {
        this.userSubs.unsubscribe();
        this.formSubs.unsubscribe();
    }

    compareFn(c1: any, c2: any): boolean {
        return c1 && c2 ? c1 === c2 : c1 === c2;
    }

    send() {
        const id = this.usuarioFM.get('id').value;
        id === null ? this.post() : this.update();
    }

    update() {
        this._usuarios.update(this.usuarioFM.value).subscribe(
            (data: Usuarios) => {
                // 1ero comprobamos que haya devuelto el usuario, sino es un msj del server
                if (!data.id) {
                    this._alert.toastError('', data);
                    return;
                }
                this._alert.sweetSuccess('', '¡Modificado correctamente!');
            },
            (err) => {
                console.log('error', err);
            },
        );
    }

    post() {
        this._usuarios.post(this.usuarioFM.value).subscribe(
            (data: Usuarios) => {
                // 1ero comprobamos que haya devuelto el usuario, sino es un msj del server
                if (!data.id) {
                    this._alert.toastError('', data);
                    return;
                }
                this._alert.sweetSuccess('', '¡Agregado correctamente!');
            },
            (err) => {
                console.log('error', err);
            },
        );
    }
}
