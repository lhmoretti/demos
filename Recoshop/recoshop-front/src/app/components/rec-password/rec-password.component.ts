import { Component, OnInit } from '@angular/core';
import { CorreoTransaccional } from 'src/app/models/correo.model';
import { MailtransaccionalService } from 'src/app/services/mailtransaccional.service';
import { AlertsService } from 'src/app/services/alerts.service';
import { ValidatorService } from 'src/app/utils/validator.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { Usuario } from 'src/app/models/usuarios.model';

@Component({
    selector: 'app-rec-password',
    templateUrl: './rec-password.component.html',
    styleUrls: ['./rec-password.component.css'],
})
export class RecPasswordComponent implements OnInit {
    mail: CorreoTransaccional = {};
    Usuario: Usuario = {};
    showFormEmail = true;
    showFormPass = false;
    showFormCod = false;
    codigoRec: any;
    pass1: any;
    pass2: any;

    constructor(
        private mailService: MailtransaccionalService,
        private alertService: AlertsService,
        private usuarioService: UsuariosService,
        private validator: ValidatorService,
    ) {}

    ngOnInit(): void {}

    validarPassword() {
        if (!this.validator.validarPassword(this.pass1, this.pass2)) {
            this.alertService.toastError(
                'Las contraseñas tienen que coincidir',
                'Upss',
            );
            return null;
        }
    }

    recuperarPassword() {
        this.mail.role = 'RP';
        this.mailService
            .postMail(this.mail)
            .toPromise()
            .then((data: any) => {
                if (data.ok == false) {
                    this.alertService.toastError(data.msg, 'Upsss');
                } else {
                    this.showFormCod = true;
                    this.showFormPass = false;
                    this.showFormEmail = false;
                }
                // console.log(data);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    verificarCodigo() {
        this.usuarioService
            .getUsuarioByRecPass(this.codigoRec)
            .subscribe((data: any) => {
                // console.log(data);
                if (data.usuario) {
                    this.Usuario = data.usuario;
                    this.showFormEmail = false;
                    this.showFormCod = false;
                    this.showFormPass = true;
                } else {
                    this.alertService.toastError(
                        'Lo sentimos el codigo de verificación no es correcto',
                        'Upsss',
                    );
                }
            });
    }

    actualizarUsuario() {
        this.validarPassword();
        this.Usuario.password = this.pass1;
        this.usuarioService.updatePassword(this.Usuario).subscribe((data) => {
            // console.log(data);
            this.alertService.toastSuccess(
                '¡Ya cambiaste tu contraseña!',
                '¡Genial!',
            );
        });
    }
}
