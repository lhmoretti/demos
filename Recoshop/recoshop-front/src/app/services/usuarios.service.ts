import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Usuario } from '../models/usuarios.model';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
import { Subject, Observable } from 'rxjs';

const URL = environment.url;

@Injectable({
    providedIn: 'root',
})
export class UsuariosService {
    constructor(private _http: HttpClient) {}

    post(Usuario: Usuario) {
        return this._http.post(`${URL}/usuarios`, Usuario);
    }
    update(Usuario: Usuario) {
        return this._http.put(`${URL}/usuario/${Usuario.id}`, Usuario);
    }
    updateUsuarioAVendedor(Usuario: Usuario) {
        return this._http.put(`${URL}/usuarioavendedor/${Usuario.id}`, Usuario);
    }
    updatePassword(Usuario: Usuario) {
        return this._http.put(
            `${URL}/usuario/updatepass/${Usuario.id}`,
            Usuario,
        );
    }

    getUsuarioById(id) {
        return this._http.get(`${URL}/usuario/${id}`);
    }
    getUsuarioByRecPass(codigo) {
        return this._http.get(`${URL}/usuarios/recpass/${codigo}`);
    }
}
