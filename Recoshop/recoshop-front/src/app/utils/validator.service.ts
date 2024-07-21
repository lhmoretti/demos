import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuarios.model';

@Injectable({
    providedIn: 'root',
})
export class ValidatorService {
    constructor() {}

    validateRegister(user: Usuario) {
        // console.log(user);

        if (user.nombre == undefined || user.nombre.length <= 2) {
            return { ok: false, msg: 'El nombre debe tener 3 o mas letras' };
        } else if (!this.validarCorreo(user.email)) {
            return { ok: false, msg: 'El correo tiene que ser válido' };
        } else if (user.telefono.length <= 9) {
            return {
                ok: false,
                msg: 'Ingresa un telefono (Debe tener 10 digitos)',
            };
        } else {
            return { ok: true, msg: 'Te registraste con éxito' };
        }
    }

    validarPassword(pass1, pass2) {
        if (pass1 === '' || pass1 === null || pass1 === undefined) {
            return false;
        }
        if (pass2 === '' || pass2 === null || pass2 === undefined) {
            return false;
        }

        if (pass1 == pass2) {
            return true;
        } else {
            return false;
        }
    }

    validarCorreo(correo) {
        if (/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.([a-zA-Z]{2,4})+$/.test(correo)) {
            return true;
        } else {
            return false;
        }
    }
}
