import {
    Component,
    OnInit,
    ViewChild,
    ElementRef,
    OnDestroy,
} from "@angular/core";
import { ProductosService } from "src/app/services/productos.service";
import { Productos } from "src/app/models/Productos.models";
import { ToastsService } from "src/app/services/toasts.service";
import { Subscription, fromEvent } from "rxjs";
import { debounceTime, distinctUntilChanged, tap, map } from "rxjs/operators";
import { Router } from "@angular/router";

@Component({
    selector: "app-productos",
    templateUrl: "./productos.page.html",
    styleUrls: ["./productos.page.scss"],
})
export class ProductosPage implements OnInit, OnDestroy {
    arrProductos: Productos[] = [];
    evtSus: Subscription;
    @ViewChild("search", { read: ElementRef }) input: ElementRef;

    constructor(
        private prodService: ProductosService,
        private toastService: ToastsService,
        private router: Router
    ) {}

    ngOnInit() {}

    async ionViewWillEnter() {
        await this.toastService.mostrarLoading();
        this.obtenerProductos();
    }

    ngOnDestroy() {
        this.evtSus.unsubscribe();
    }

    ionViewDidEnter() {
        this.evtSus = fromEvent(this.input.nativeElement, "keyup")
            .pipe(
                debounceTime(450),
                distinctUntilChanged(),
                tap(() => {
                    this.buscarProds();
                })
            )
            .subscribe();
    }

    obtenerProductos() {
        this.prodService.getAllProductos().subscribe((data) => {
            this.arrProductos = data;
            this.toastService.esconderLoading();
        });
    }

    edit(id) {
        this.router.navigate(["main/productos/crud-productos", id]);
    }

    delete(id) {
        this.prodService.deleteProducto(id).subscribe((data) => {
            this.toastService.successToast("Producto eliminado con exito");
            this.obtenerProductos();
        });
    }

    buscarProds() {
        if (this.input.nativeElement.value === "") this.obtenerProductos();
        else
            this.prodService
                .searchProducto(this.input.nativeElement.value)
                .subscribe((data) => {
                    this.arrProductos = data;
                });
    }
}
