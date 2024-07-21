import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Producto } from '../models/producto.model';
import { Lineas } from '../models/linea.model';
import { AlertsService } from './alerts.service';

@Injectable({
    providedIn: 'root',
})
export class CartService {
    cartSubjt = new Subject<any>();
    arrLineas: Lineas[] = [];
    Total = 0;
    arrIdsComercios: any[] = [];

    constructor(private alertService: AlertsService) {
        let arrLin: any[] = [];
        arrLin = JSON.parse(localStorage.getItem('lineas'));

        const arrComercios = JSON.parse(localStorage.getItem('Comercios'));
        if (arrComercios != null) {
            for (const i of arrComercios) {
                this.arrIdsComercios.push(i);
            }
        }

        // console.log(arrComercios);

        if (arrLin != null) {
            for (const i of arrLin) {
                this.arrLineas.push(i);
            }
        }
        this.obtenerTotal();
    }

    returnCart(): Observable<any> {
        return this.cartSubjt.asObservable();
    }

    getCart() {
        this.cartSubjt.next({
            lineas: this.arrLineas,
            total: this.Total,
        });
    }

    addCart(linea: Lineas) {
        const encoLinea = this.arrLineas.find(
            (e) => e.id_prod == linea.id_prod,
        );

        if (encoLinea == undefined) {
            localStorage.removeItem('lineas');
            this.arrLineas.push(linea);
            localStorage.setItem('lineas', JSON.stringify(this.arrLineas));
        } else {
            localStorage.removeItem('linea');
            encoLinea.cantidad += linea.cantidad;

            localStorage.setItem('lineas', JSON.stringify(this.arrLineas));
        }
        // console.log(this.arrLineas);

        this.alertService.alertAddProd();
        this.getCart();
        this.obtenerTotal();
    }

    deleteLinea(linea) {
        localStorage.removeItem('lineas');
        const ind = this.arrLineas.indexOf(linea);
        this.arrLineas.splice(ind, 1);
        localStorage.setItem('lineas', JSON.stringify(this.arrLineas));
        this.getCart();
        this.obtenerTotal();
    }

    obtenerTotal() {
        if (this.arrLineas.length != 0) {
            this.Total = 0;
            for (const i of this.arrLineas) {
                if (i.unidad == 100) {
                    if (i.oferta) {
                        this.Total += i.precio_oferta * (i.cantidad / 1000);
                    } else {
                        this.Total += i.precio_venta * (i.cantidad / 1000);
                    }
                } else {
                    if (i.oferta) {
                        this.Total += i.precio_oferta * i.cantidad;
                    } else {
                        this.Total += i.precio_venta * i.cantidad;
                    }
                }
            }
            this.getCart();
        }
    }

    agregarCarrito(producto: Producto, cant: number) {
        const linea: Lineas = {};
        linea.nombre = producto.nombre;
        linea.descripcion = producto.descripcion;
        linea.oferta = producto.promocion;
        linea.precio_venta = producto.precio_venta;
        linea.precio_oferta = producto.precio_oferta;
        linea.img = producto.imagenes[0] ? producto.imagenes[0].url : null;
        linea.id_prod = producto.id;
        linea.unidad = producto.unidad;
        linea.cantidad = cant;
        linea.comercioId = producto.comercioId;
        // console.log(producto);

        console.log(linea);

        this.addCart(linea);
    }
}
