import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';
import { Categoria } from '../models/categoria.model';

const URL = environment.url;

@Injectable({
    providedIn: 'root',
})
export class CategoriaService {
    constructor(private _http: HttpClient) {}

    getCategorias() {
        return this._http.get(`${URL}/categorias`);
    }
    getCategoriasActivas() {
        return this._http.get(`${URL}/categorias/activas`);
    }

    public getAll(): Observable<Categoria[]> {
        return this._http.get<Categoria[]>(`${URL}/categorias`).pipe(
            map((res) => {
                return res as Categoria[];
            }),
        );
    }
}
