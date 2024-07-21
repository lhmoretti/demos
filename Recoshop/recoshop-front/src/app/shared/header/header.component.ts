import {
    Component,
    OnInit,
    AfterViewInit,
    ViewChild,
    ElementRef,
    OnDestroy,
} from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Subscription, fromEvent, Observable } from 'rxjs';
import { Lineas } from 'src/app/models/linea.model';
import { Usuario } from 'src/app/models/usuarios.model';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ProductosService } from 'src/app/services/productos.service';
import { debounceTime, distinctUntilChanged, tap, map } from 'rxjs/operators';
import { Producto } from 'src/app/models/producto.model';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, AfterViewInit, OnDestroy {
    arrLineas: Lineas[] = [];
    cartSubs: Subscription;
    userSubs: Subscription;
    Total = 0;
    Usuario: Usuario = {};
    searchTxt = '';

    showContProds = false;

    arrProductos: Producto[] = [];

    showMicuenta = false;

    evtSus: Subscription;
    @ViewChild('search', { read: ElementRef }) input: ElementRef;

    source: Observable<any>;
    click$: Observable<any>;

    constructor(
        private cartService: CartService,
        private authService: AuthService,
        public _prods: ProductosService,
        private router: Router,
    ) {}

    ngAfterViewInit() {
        this.evtSus = fromEvent(this.input.nativeElement, 'keyup')
            .pipe(
                debounceTime(450),
                distinctUntilChanged(),
                tap(() => {
                    this.buscarProds();
                }),
            )
            .subscribe();
    }

    ngOnInit(): void {
        this.source = fromEvent(document, 'click');
        this.click$ = this.source.pipe(
            map((event) => {
                this.limparBusqueda();
            }),
        );
        this.click$.subscribe();

        this.cartSubs = this.cartService.returnCart().subscribe((data) => {
            this.arrLineas = data.lineas;
            this.Total = data.total;
        });

        this.cartService.getCart();

        this.userSubs = this.authService.returnUser().subscribe((data) => {
            this.Usuario = data.usuario;
            this.showMicuenta = data.isLogged;
        });

        this.authService.getUser();
    }

    ngOnDestroy() {}

    limparBusqueda() {
        this.arrProductos = [];
        this.showContProds = false;
    }

    buscarProds() {
        if (this.searchTxt === '') {
            this.limparBusqueda();
            return;
        }

        this._prods.busquedaProductos(this.searchTxt, 0, 15).subscribe(
            (data: any) => {
                if (data.length === 0) {
                    this.limparBusqueda();
                    return;
                }
                this.arrProductos = data;
                this.showContProds = true;
            },
            (err) => {
                console.log('Error', err);
            },
        );
    }

    eliminarLinea(linea) {
        this.cartService.deleteLinea(linea);
    }

    cerrarSesion() {
        this.Usuario = {};
        this.authService.logout();
    }

    buscarTxt(value) {
        this._prods.addTxt(value);
        this.router.navigate(['lista-buscados']);
    }
}
