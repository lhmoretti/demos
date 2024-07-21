import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuarios.model';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { AlertsService } from 'src/app/services/alerts.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-mi-cuenta',
    templateUrl: './mi-cuenta.component.html',
    styleUrls: ['./mi-cuenta.component.css'],
})
export class MiCuentaComponent implements OnInit {
    LocalUser: Usuario = {};
    Usuario: Usuario = {};

    showCuenta = true;
    showPedidos = false;

    constructor(
        private usuarioService: UsuariosService,
        private alertService: AlertsService,
        private authService: AuthService,
        private router: Router,
    ) {}

    ngOnInit(): void {
        this.getLocal();
    }

    async getLocal() {
        this.LocalUser = await JSON.parse(localStorage.getItem('rs-user'));
        console.log(this.LocalUser);

        if (this.LocalUser.id == null) {
            this.router.navigate(['login']);
        }
        this.obtenerUsuarioById();
    }

    guardarUsuario() {
        this.usuarioService.update(this.Usuario).subscribe((data) => {
            localStorage.removeItem('rs-user');
            localStorage.setItem('rs-user', JSON.stringify(this.Usuario));
            this.alertService.alertSuccess(
                '¡Exito!',
                'Tus datos se actualizaron correctamente!',
            );
        });
    }

    obtenerUsuarioById() {
        this.usuarioService
            .getUsuarioById(this.LocalUser.id)
            .subscribe((data) => {
                console.log(data);

                this.Usuario = data;
            });
    }

    show(selecion) {
        if (selecion == 'MP') {
            this.showCuenta = false;
            this.showPedidos = true;
        } else if (selecion == 'MC') {
            this.showCuenta = true;
            this.showPedidos = false;
        } else if (selecion == 'RA') {
            window.open('https://www.your-domain.com.ar/admin/');
        } else if (selecion == 'RC') {
            this.router.navigate(['registrar-comercio']);
        }
    }

    cerrarSesion() {
        this.Usuario = {};
        this.authService.logout();
    }
}
