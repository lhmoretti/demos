import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AlertsService } from 'src/app/services/alerts.service';
import { AuthService } from 'src/app/services/auth.service';
import { Usuario } from 'src/app/models/usuarios.model';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { ValidatorService } from 'src/app/utils/validator.service';
import { Router } from '@angular/router';
import { MailtransaccionalService } from 'src/app/services/mailtransaccional.service';
import { CorreoTransaccional } from 'src/app/models/correo.model';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
    userLogin = {
        email: '',
        password: '',
    };
    password1: any;
    password2: any;

    Localidad = 'SL';

    arrLocalidades: any[] = [
        'Reconquista',
        'Avellaneda',
        'Malabrigo',
        'Guadalupe Norte',
        'Lanteri',
        'Villa Ocampo',
        'Vera',
        'Otra',
    ];

    Usuario: Usuario = {};

    token: any;
    constructor(
        private alertService: AlertsService,
        private auth_service: AuthService,
        private router: Router,
        private user_service: UsuariosService,
        private validator: ValidatorService,
        private mailService: MailtransaccionalService,
    ) {}

    ngOnInit() {}

    login(fLogin: NgForm) {
        if (fLogin.invalid) {
            this.alertService.alertDanger(
                'Error',
                'Tenes que completar todos los campos',
            );
            return null;
        }

        this.auth_service
            .login(this.userLogin)
            .then((data) => {
                this.router.navigate(['inicio']);
            })
            .catch((err) => {
                this.alertService.toastErrorSession(
                    'Intenta nuevamente',
                    'Datos incorrectos',
                );
            });
    }

    validar() {
        if (!this.validator.validarPassword(this.password1, this.password2)) {
            this.alertService.toastError(
                'Las contraseñas no coinciden',
                'Error',
            );
        }
    }

    registrar(fRegistrar: NgForm) {
        const resp = this.validator.validateRegister(this.Usuario);
        const resPass = this.validator.validarPassword(
            this.password1,
            this.password2,
        );

        if (resp.ok == false) {
            this.alertService.alertDanger('Upsss', resp.msg);
            return null;
        }

        if (resPass == false) {
            this.alertService.alertDanger(
                'Upsss',
                'Las contraseñas no coinciden',
            );
            return;
        }

        if (this.Localidad == 'SL') {
            this.alertService.alertDanger('Upsss', 'La localidad es requerida');
            return;
        }

        this.Usuario.password = this.password1;
        this.Usuario.nombre = this.Usuario.nombre;
        this.Usuario.role = 3;
        this.Usuario.activo = true;
        this.Usuario.domicilio = '';
        this.Usuario.localidad = this.Localidad;
        this.Usuario.avatar = '';
        // console.log(this.Usuario);

        this.user_service.post(this.Usuario).subscribe(
            (data: any) => {
                /**
                 * Validamos que haya devuelto el usuario, de lo contrario es un msj del server.
                 *
                 * A TENER EN CUENTA PARA CAMBIAR EL MSJ EN EL SERVER:
                 * {  auth: false,
                 *    usuario: {
                 *      ...
                 *    }
                 * }
                 */
                if (!data.id) {
                    this.alertService.toastAlert(data, ''); // <-- msj del server
                    return;
                }

                if (data.id != null) {
                    this.alertService.alertSuccess(
                        '¡Muy bien!',
                        'Te registro fue exitoso, ya diste el primer paso.',
                    );
                    const usr = {
                        email: this.Usuario.email,
                        password: this.Usuario.password,
                    };
                    const body: CorreoTransaccional = {};
                    body.correo = this.Usuario.email;
                    body.nombre = `${this.Usuario.nombre} ${this.Usuario.apellido}`;
                    body.role = 'RU';
                    this.mailService
                        .postMail(body)
                        .toPromise()
                        .then((data) => {
                            this.auth_service.login(usr).then((resp) => {
                                this.router.navigate(['/registrar-comercio']);
                            });
                        });
                }
            },
            (err) => {
                this.alertService.toastErrorSession(
                    'Lo sentimos, intenta nuevamente más tarde.',
                    'Error',
                );
                console.log(err);
            },
        );
    }

    validarNum(event) {
        console.log(event.charCode);

        if (event.charCode >= 48 && event.charCode <= 57) {
            return true;
        }
        return false;
    }
}
