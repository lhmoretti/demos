import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { Mesas } from "../models/Mesas.model";

const urlRestS = `${environment.urlRest}/mesas`;

@Injectable({
    providedIn: "root",
})
export class MesasService {
    constructor(private _http: HttpClient) {}

    getMesas() {
        return this._http.get(`${urlRestS}`).pipe(
            map((res) => {
                return <Mesas[]>res;
            })
        );
    }

    agregarMesa(mesa: Mesas) {
        return this._http.post(urlRestS, mesa);
    }
    eliminarMesa(id) {
        return this._http.delete(`${urlRestS}/${id}`);
    }
}
