import { Component, OnInit } from '@angular/core';
import { ProductosService } from 'src/app/services/productos.service';
import { ActivatedRoute } from '@angular/router';
import { ComercioService } from 'src/app/services/comercio.service';
import { Producto } from 'src/app/models/producto.model';
import { Comercio } from 'src/app/models/comercio.model';

@Component({
    selector: 'app-comercio',
    templateUrl: './comercio.component.html',
    styleUrls: ['./comercio.component.css'],
})
export class ComercioComponent implements OnInit {
    Id: any;
    arrProductosComercio: Producto[] = [];
    arrPromocionComercio: Producto[] = [];
    arrDestacadosComercio: Producto[] = [];
    Comercio: Comercio = {} as Comercio;

    constructor(
        private prodService: ProductosService,
        private actRoute: ActivatedRoute,
        private comercioService: ComercioService,
    ) {}

    ngOnInit(): void {
        this.Id = this.actRoute.snapshot.paramMap.get('id');
        this.obtenerProductos();
        this.obtenerComercio();
        this.getPromocionComercio();
        this.getDestacadosComercio();
    }

    obtenerProductos() {
        this.prodService.getProductosByComercio(this.Id).subscribe(
            (data: any) => {
                // console.log(data);
                this.arrProductosComercio = data;
            },
            (err) => {
                console.log('Error: ', err);
            },
        );
    }

    obtenerComercio() {
        this.comercioService.getComercioById(this.Id).subscribe(
            (data) => {
                this.Comercio = data;
            },
            (err) => {
                console.log('Error: ', err);
            },
        );
    }

    getPromocionComercio() {
        this.prodService.getPromocionComercio(this.Id).subscribe(
            (data: Producto[]) => {
                this.arrPromocionComercio = data;
            },
            (err) => {
                console.log('Error:', err);
            },
        );
    }

    getDestacadosComercio() {
        this.prodService.getDestacadosComercio(this.Id).subscribe(
            (data: Producto[]) => {
                this.arrDestacadosComercio = data;
            },
            (err) => {
                console.log('Error:', err);
            },
        );
    }
}
