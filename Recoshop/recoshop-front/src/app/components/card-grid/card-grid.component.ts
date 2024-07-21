import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ProductosService } from 'src/app/services/productos.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
    selector: 'app-card-grid',
    templateUrl: './card-grid.component.html',
    styleUrls: ['./card-grid.component.css'],
})
export class CardGridComponent implements OnInit {
    @Input() arrProductos: any[] = [];

    constructor(
        private router: Router,
        public cart: CartService,
        public _prods: ProductosService,
    ) {}

    ngOnInit(): void {}
}
