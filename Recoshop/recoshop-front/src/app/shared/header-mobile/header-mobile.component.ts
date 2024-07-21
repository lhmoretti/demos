import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuarios.model';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { ProductosService } from 'src/app/services/productos.service';

@Component({
    selector: 'app-header-mobile',
    templateUrl: './header-mobile.component.html',
    styleUrls: ['./header-mobile.component.css'],
})
export class HeaderMobileComponent implements OnInit {
    subsUser: Subscription;

    Usuario: Usuario = {};
    constructor(
        private router: Router,
        private authService: AuthService,
        private prodService: ProductosService,
    ) {}

    ngOnInit(): void {
        this.subsUser = this.authService.returnUser().subscribe((data) => {
            this.Usuario = data.usuario;
        });
        this.authService.getUser();
    }

    redirigir() {
        if (Object.keys(this.Usuario).length == 0) {
            this.router.navigate(['login']);
        } else if (Object.keys(this.Usuario).length != 0) {
            this.router.navigate(['mi-cuenta']);
        }
    }

    buscarTxt(value) {
        this.prodService.addTxt(value);
        this.router.navigate(['lista-buscados']);
    }
}
