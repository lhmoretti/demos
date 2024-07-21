import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';
import { Lineas } from 'src/app/models/linea.model';

@Component({
    selector: 'app-cart-mobile',
    templateUrl: './cart-mobile.component.html',
    styleUrls: ['./cart-mobile.component.css'],
})
export class CartMobileComponent implements OnInit {
    subsCart: Subscription;
    arrLineas: Lineas[] = [];

    constructor(private cartService: CartService) {}
    show: boolean = null;

    ngOnInit(): void {
        this.subsCart = this.cartService.returnCart().subscribe((data) => {
            this.arrLineas = data.lineas;
        });

        this.cartService.getCart();
    }

    mostrarCart() {
        this.show = !this.show;
    }

    eliminarLinea(linea) {
        this.cartService.deleteLinea(linea);
    }
}
