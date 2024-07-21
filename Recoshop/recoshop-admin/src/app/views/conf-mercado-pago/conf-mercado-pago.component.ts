import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ComerciosService } from 'src/app/services/comercios.service';
import { Usuarios } from 'src/app/models/Usuarios';
import { Comercios } from 'src/app/models/Comercios';

@Component({
    selector: 'app-conf-mercado-pago',
    templateUrl: './conf-mercado-pago.component.html',
    styleUrls: ['./conf-mercado-pago.component.css'],
})
export class ConfMercadoPagoComponent implements OnInit {
    idComercio: number;
    ComercioSelect: Comercios = null;
    Usuario: Usuarios = {};
    arrComercios: Comercios[] = [];
    showPaso1 = false;
    credenciales: any = {};
    typeInput = 'password';

    constructor(
        private _authService: AuthService,
        private _comercioService: ComerciosService,
    ) {}

    ngOnInit(): void {
        this.Usuario = this._authService.returnUser();
        console.log(this.Usuario);
        this.obtenerComerciosUsuario();
    }

    obtenerComerciosUsuario() {
        this._comercioService
            .getComerciosByIdUsuario(this.Usuario.id)
            .subscribe((data) => {
                console.log(data);

                this.arrComercios = data;
            });
    }

    obtenerComercioId() {
        this._comercioService.get(this.idComercio).subscribe((data) => {
            console.log(data);
            this.ComercioSelect = data;
        });
    }

    changeEstado() {
        this.showPaso1 = true;
        console.log(this.ComercioSelect);

        console.log(this.showPaso1);
    }

    verCredenciales(comercio: Comercios) {
        this.ComercioSelect = comercio;
        this.credenciales.access_token = comercio.access_token;
        this.credenciales.last_update = comercio.last_update_token;
    }

    showToken() {
        this.typeInput == 'password'
            ? (this.typeInput = 'text')
            : (this.typeInput = 'password');
    }

    obtenerLink() {
        console.log(this.ComercioSelect);

        this.idComercio = this.ComercioSelect.id;
        localStorage.setItem('mp-create-id', JSON.stringify(this.idComercio));

        const url = `https://auth.mercadopago.com.ar/authorization?client_id=4783444611080351&response_type=code&platform_id=mp&state=${this.idComercio}&redirect_uri=https://your-domain.com.ar/api/v1/mercadopago/adhesionmarketplace`;

        window.open(url, '_self');
    }
}
