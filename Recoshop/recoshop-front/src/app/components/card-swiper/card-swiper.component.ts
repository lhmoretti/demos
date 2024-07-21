import { Component, OnInit, Input } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Router } from '@angular/router';
import { Producto } from 'src/app/models/producto.model';
import { CartService } from 'src/app/services/cart.service';
import { ProductosService } from 'src/app/services/productos.service';

@Component({
    selector: 'app-card-swiper',
    templateUrl: './card-swiper.component.html',
    styleUrls: ['./card-swiper.component.css'],
})
export class CardSwiperComponent implements OnInit {
    @Input() Titulo: String;
    @Input() arrArts: Producto[] = [];
    @Input() optSwiper: OwlOptions = {};

    constructor(
        private router: Router,
        public cart: CartService,
        public _prods: ProductosService,
    ) {}

    ngOnInit(): void {
        // console.log(this.arrArts);
    }
}
