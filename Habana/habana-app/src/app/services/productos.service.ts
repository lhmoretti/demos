import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { map } from "rxjs/operators";
import { Productos } from "../models/Productos.models";

const urlRestS = `${environment.urlRest}/productos`;

@Injectable({
    providedIn: "root",
})
export class ProductosService {
    constructor(private _http: HttpClient) {}

    getAllProductos() {
        return this._http.get(`${urlRestS}`).pipe(
            map((res) => {
                return <Productos[]>res;
            })
        );
    }
    getProductoId(id: any) {
        return this._http.get(`${urlRestS}/id/${id}`).pipe(
            map((res) => {
                return <Productos>res;
            })
        );
    }
    deleteProducto(id) {
        return this._http.delete(`${urlRestS}/${id}`);
    }

    updateProducto(producto: Productos) {
        return this._http.put(urlRestS, producto);
    }
    postProducto(producto: Productos) {
        return this._http.post(urlRestS, producto);
    }
    searchProducto(nombre) {
        return this._http.get(`${urlRestS}/nombre/${nombre}`).pipe(
            map((res) => {
                return <Productos[]>res;
            })
        );
    }
}
