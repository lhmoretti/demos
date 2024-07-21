import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductosService } from 'src/app/services/productos.service';
import { Subscription } from 'rxjs';
import { PaginationService } from 'src/app/services/pagination.service';
import { Producto } from 'src/app/models/producto.model';
import { async } from '@angular/core/testing';

@Component({
    selector: 'app-lista-productos',
    templateUrl: './lista-productos.component.html',
    styleUrls: ['./lista-productos.component.css'],
})
export class ListaProductosComponent implements OnInit, OnDestroy {
    idCategoria: any;
    subsPag: Subscription;
    subsDisable: Subscription;
    pagina = 0;
    arrProductos: Producto[] = [];

    constructor(
        private actRoute: ActivatedRoute,
        private prodService: ProductosService,
        private pagination: PaginationService,
    ) {}
    ngOnDestroy(): void {
        this.subsPag.unsubscribe();
    }

    ngOnInit(): void {
        this.idCategoria = this.actRoute.snapshot.paramMap.get('id');

        this.subsPag = this.pagination.returnPage().subscribe((data) => {
            // console.log(data);
            this.pagina = data.pagina;
            this.getProductosByCategoria();
        });
        this.pagination.getPage();
    }

    getProductosByCategoria() {
        this.prodService
            .getByCategoria(this.idCategoria, this.pagina, 10)
            .subscribe((data: any) => {
                console.log(data);
                this.arrProductos = data;
                console.log(this.arrProductos);

                if (this.arrProductos.length < 10) {
                    console.log('Entro!');

                    this.pagination.addDisabled(true);
                } else {
                    this.pagination.addDisabled(false);
                }
            });
    }
}
