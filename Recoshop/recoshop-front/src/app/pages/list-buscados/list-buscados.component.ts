import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductosService } from 'src/app/services/productos.service';
import { Producto } from 'src/app/models/producto.model';
import { PaginationService } from 'src/app/services/pagination.service';

@Component({
    selector: 'app-list-buscados',
    templateUrl: './list-buscados.component.html',
    styleUrls: ['./list-buscados.component.css'],
})
export class ListBuscadosComponent implements OnInit {
    txtSubscription: Subscription;
    subsPagina: Subscription;
    txtSearch = '';
    arrProductos: Producto[] = [];
    pagina = 0;

    constructor(
        private prodSerivce: ProductosService,
        private pagination: PaginationService,
    ) {}

    ngOnInit() {
        this.txtSubscription = this.prodSerivce
            .returnTxt()
            .subscribe(async (data) => {
                // console.log(data);
                this.txtSearch = data;
                if (this.txtSearch != '') {
                    this.getProductos(this.txtSearch);
                }
            });

        this.prodSerivce.getTxt();

        this.subsPagina = this.pagination.returnPage().subscribe((data) => {
            // console.log(data);
            this.pagina = data.pagina;
        });
        this.pagination.getPage();
    }

    getProductos(txt) {
        this.prodSerivce
            .busquedaProductos(txt, this.pagina, 20)
            .subscribe((data: any) => {
                // console.log(data);
                this.arrProductos = data;
            });
    }
}
