import { Component, OnInit, Input } from '@angular/core';
import { CategoriaService } from 'src/app/services/categoria.service';
import { Categoria } from 'src/app/models/categoria.model';
import { Observable } from 'rxjs';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Producto } from 'src/app/models/producto.model';
import { ProductosService } from 'src/app/services/productos.service';
import { Comercio } from 'src/app/models/comercio.model';
import { Router } from '@angular/router';

@Component({
    selector: 'app-categorias',
    templateUrl: './categorias.component.html',
    styleUrls: ['./categorias.component.css'],
})
export class CategoriasComponent implements OnInit {
    categorias: Categoria[] = [];

    constructor(
        private router: Router,
        private _categorias: CategoriaService,
        private _prods: ProductosService,
    ) {}

    ngOnInit(): void {
        this.getAllCategorias();
    }

    getAllCategorias() {
        this._categorias.getAll().subscribe(
            (data: Comercio[]) => {
                this.categorias = data;
            },
            (err) => {
                console.log('Error:', err);
            },
        );
    }

    verProdsCategoria(categoria) {
        let nombreSE = '';
        for (let i = 0; i < categoria.categoria.length; i++) {
            nombreSE +=
                categoria.categoria.charAt(i) == ' '
                    ? '-'
                    : categoria.categoria.charAt(i);
        }
        this.router.navigate(['lista-productos', categoria.id, nombreSE]);
    }
}
