import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AlertsService } from 'src/app/services/alerts.service';
import { Usuario } from 'src/app/models/usuarios.model';
import { Subscription } from 'rxjs';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { AuthService } from 'src/app/services/auth.service';
import { Comercio } from 'src/app/models/comercio.model';
import { ComercioService } from 'src/app/services/comercio.service';
import { Router } from '@angular/router';
import { MailtransaccionalService } from 'src/app/services/mailtransaccional.service';
import { CorreoTransaccional } from 'src/app/models/correo.model';
import { async } from '@angular/core/testing';

@Component({
    selector: 'app-reg-comercio',
    templateUrl: './reg-comercio.component.html',
    styleUrls: ['./reg-comercio.component.css'],
})
export class RegComercioComponent implements OnInit {
    Comercio: Comercio = {
        cuit: '',
    };
    Usuario: Usuario = {};

    planNegocio = true;
    planCorporativo = false;
    planEmpresa = false;
    PlanSel = '';
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

    public userSubs: Subscription;

    constructor(
        private alertService: AlertsService,
        private comercioService: ComercioService,
        private usuarioService: UsuariosService,
        private mailService: MailtransaccionalService,
        private router: Router,
    ) {}

    ngOnInit() {
        this.Usuario = JSON.parse(localStorage.getItem('rs-user'));
        // console.log(this.Usuario);
    }

    selectPlan(value) {
        if (value == 'N') {
            this.PlanSel = 'Negocio';
            this.planNegocio = true;
            this.planEmpresa = false;
            this.planCorporativo = false;
        } else if (value == 'C') {
            this.PlanSel = 'Corporativo';
            this.planNegocio = false;
            this.planEmpresa = false;
            this.planCorporativo = true;
        } else if (value == 'E') {
            this.PlanSel = 'Empresa';
            this.planNegocio = false;
            this.planEmpresa = true;
            this.planCorporativo = false;
        }
    }

    registrarComercio(fRegComercio: NgForm) {
        if (fRegComercio.invalid) {
            this.alertService.alertDanger(
                'Upss',
                'Debés completar todos los campos para continuar',
            );
            return null;
        }

        this.Usuario.role = 2;

        this.usuarioService
            .updateUsuarioAVendedor(this.Usuario)
            .subscribe(async (data: any) => {
                // console.log(data);
                this.Usuario = await data;
                // console.log(this.Usuario);

                localStorage.removeItem('rs-user');
                localStorage.setItem('rs-user', JSON.stringify(this.Usuario));

                if (data.message == 'No se encontró el usuario') {
                    this.alertService.toastError(data.message, 'Upsss');
                    return null;
                }

                this.Comercio.usuarios = [this.Usuario];
                this.Comercio.plan = this.PlanSel;
                if (this.Localidad == 'SL') {
                    this.alertService.toastError(
                        'La localidad es requerida',
                        'Upsss',
                    );
                    return;
                }
                this.Comercio.localidad = this.Localidad;

                // console.log(this.Comercio);

                const body: CorreoTransaccional = {};
                body.correo = this.Usuario.email;
                body.nombre = this.Comercio.nombre;
                body.role = 'RC';

                this.comercioService.post(this.Comercio).subscribe((data) => {
                    // console.log(data);

                    this.alertService.alertComercioRegistrado(
                        '¡Perfecto!',
                        'Ya estás registrado como comercio. ¿Ahora qué querés hacer?',
                    );
                    this.mailService
                        .postMail(body)
                        .toPromise()
                        .then((data) => {})
                        .catch((err) => {
                            console.log(err);
                        });
                });
            });

        // console.log(this.Comercio);
    }
}
