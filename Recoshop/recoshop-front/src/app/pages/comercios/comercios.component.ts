import { Component, OnInit } from '@angular/core';
import { ComercioService } from 'src/app/services/comercio.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-comercios',
    templateUrl: './comercios.component.html',
    styleUrls: ['./comercios.component.css'],
})
export class ComerciosComponent implements OnInit {
    arrComercios: any[] = [];

    constructor(
        private comercioService: ComercioService,
        private router: Router,
    ) {}

    ngOnInit(): void {
        this.obtenerComerciosHabilitados();
    }

    obtenerComerciosHabilitados() {
        this.comercioService
            .getComerciosHabilitados()
            .subscribe((data: any) => {
                // console.log(data);

                this.arrComercios = data;
            });
    }

    verComercio(id, nombre) {
        let nombreSE = '';
        for (let i = 0; i < nombre.length; i++) {
            nombreSE += nombre.charAt(i) == ' ' ? '-' : nombre.charAt(i);
        }
        this.router.navigate(['comercio', id, nombreSE]);
    }
}
