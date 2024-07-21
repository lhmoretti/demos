import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Empleados } from "../models/Empleados.model";
import { catchError, map, tap } from "rxjs/operators";

const urlRestS = `${environment.urlRest}/usuarios`;

@Injectable({
    providedIn: "root",
})
export class EmpleadosService {
    constructor(private _http: HttpClient) {}

    getAllEmpleados() {
        return this._http.get(`${urlRestS}`).pipe(
            map((res) => {
                return <Empleados[]>res;
            })
        );
    }

    postEmpleado(empleado: Empleados) {
        return this._http.post(`${urlRestS}`, empleado).pipe(
            map((data: any) => {
                return data;
            })
        );
    }

    deleteEmpleado(id) {
        return this._http.delete(`${urlRestS}/${id}`);
    }

    updateEmpleado(empleado: Empleados) {
        return this._http.put(`${urlRestS}`, empleado).pipe(
            map((data: any) => {
                return data;
            })
        );
    }

    getByIdEmpleado(id) {
        return this._http.get(`${urlRestS}/${id}`).pipe(
            map((res) => {
                return <Empleados>res;
            })
        );
    }
}
