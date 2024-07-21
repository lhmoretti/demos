import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Categorias } from './Categorias';
import { Marcas } from './Marcas';
import { Comercios } from './Comercios';

export class Usuarios {
    id?: number;
    username?: string;
    password?: string;
    nombre?: string;
    apellido?: string;
    avatar?: string;
    telefono?: string;
    domicilio?: string;
    email?: string;
    created_at?: Date;
    updated_at?: Date;
    role?: number;
    activo?: boolean;
    recpass?: string;
    comercios?: Comercios[];
    provincia?: string;
    localidad?: string;
}

@Injectable({ providedIn: 'root' })
export class UsuariosForm {
    constructor(private fb?: FormBuilder) {}

    public UsuariosForm = this.fb.group({
        id: [],
        username: [],
        // password: [],
        nombre: [],
        apellido: [],
        avatar: [],
        telefono: ['', Validators.required],
        domicilio: [],
        email: ['', Validators.required],
        created_at: [],
        updated_at: [],
        role: ['', Validators.required],
        activo: [],
        recpass: [],
        provincia: [],
        localidad: [],
        // comercios: [],
    });
}
