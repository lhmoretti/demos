import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductosService } from 'src/app/services/productos.service';
import { OwlCarouselOptions } from 'src/app/components/owl-carousel';
import { Producto } from 'src/app/models/producto.model';
import { CartService } from 'src/app/services/cart.service';
import { AlertsService } from 'src/app/services/alerts.service';

@Component({
    selector: 'app-ver-articulo',
    templateUrl: './ver-articulo.component.html',
    styleUrls: ['./ver-articulo.component.css'],
})
export class VerArticuloComponent implements OnInit {
    id: any;
    descripcion: any;
    productosRelacionados: any[] = [];
    arrImagenes: any[] = [];
    Titulo = 'Relacionados';
    optsCarousel = OwlCarouselOptions.carouselOptsRelacionados;
    optsImgsProductos = OwlCarouselOptions.carouselImgsProducto;
    Producto: Producto = {};
    Cantidad = 1;

    selectedImg: any = {};

    constructor(
        private actRouter: ActivatedRoute,
        private router: Router,
        private prod_service: ProductosService,
        private cartService: CartService,
        private alertService: AlertsService,
    ) {}

    ngOnInit(): void {
        this.actRouter.paramMap.subscribe((data: any) => {
            this.id = data.get('id');
            this.obtenerProducto();

            this.scrollTop();
        });

        this.obtenerProducto();
    }

    scrollTop() {
        const scrollToTop = window.setInterval(() => {
            const pos = window.pageYOffset;
            if (pos > 0) {
                window.scrollTo(0, pos - 900); // how far to scroll on each step
            } else {
                window.clearInterval(scrollToTop);
            }
        }, 16);
    }

    sumarCantidad(Unidad) {
        this.Cantidad += Unidad;
    }

    restarCantidad(Unidad) {
        if (this.Cantidad > 1) {
            this.Cantidad -= Unidad;
        }
    }

    getRelacionados() {
        this.prod_service
            .getByCategoria(this.Producto.categoriaId.id, 0, 13)
            .subscribe((data: any) => {
                this.productosRelacionados = data;
            });
    }

    selectImg(img) {
        const antImg = this.selectedImg;
        const ind = this.arrImagenes.indexOf(img);
        this.selectedImg = img;
        this.arrImagenes.splice(ind, 1);
        this.arrImagenes.push(antImg);
    }

    obtenerProducto() {
        this.prod_service.getById(this.id).subscribe(async (data: any) => {
            this.Producto = await data;

            this.Cantidad = data.unidad;
            this.getRelacionados();
            this.imagenes();
        });
    }

    agregarCarrito(producto: Producto) {
        if (this.Cantidad < 1) {
            this.alertService.alertDanger('Error', 'Ingresa la cantidad');
            return null;
        }
        producto.imagenes = [this.selectedImg];
        this.cartService.agregarCarrito(producto, this.Cantidad);
    }

    imagenes() {
        const arr = this.Producto.imagenes;
        this.arrImagenes = arr;
        this.selectedImg = this.arrImagenes[0];
        this.arrImagenes.splice(0, 1);
    }

    verComercio(id, nombre) {
        let nombreSE = '';
        for (let i = 0; i < nombre.length; i++) {
            nombreSE += nombre.charAt(i) == ' ' ? '-' : nombre.charAt(i);
        }
        this.router.navigate(['comercio', id, nombreSE]);
    }
}
