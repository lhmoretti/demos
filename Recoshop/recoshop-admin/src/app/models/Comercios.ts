import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Marcas } from './Marcas';
import { Categorias } from './Categorias';
import { Productos } from './Productos';
import { Usuarios } from './Usuarios';
import { CategoriasComercios } from './CategoriasComercios';

export class Comercios {
    id?: number;
    nombre?: string;
    descripcion?: string;
    cuit?: string;
    banner?: string;
    plan?: string;
    avatar?: string;
    telefono?: string;
    domicilio?: string;
    email?: string;
    created_at?: Date;
    updated_at?: Date;
    activo?: boolean;
    socio_cic?: boolean;
    productos?: Productos[];
    mp_acuerdo_vendedor?: boolean;
    mp_mercadopago?: boolean;
    mp_pago_sucursal?: boolean;
    mp_mercadopago_qr?: boolean;
    mp_trans_banc?: boolean;
    mp_abono_contra?: boolean;
    mp_pago_posnet?: boolean;
    e_delivery?: boolean;
    e_acuerdo_vendedor?: boolean;
    e_retiro_sucursal?: boolean;
    marcas?: Marcas[];
    catComId?: CategoriasComercios;
    usuarios?: Usuarios[];
    access_token?: string;
    auth_code?: string;
    last_update_token?: Date;
    refresh_token?: string;
}

export class ComerciosJson {
    public static ComerciosJson: Comercios = {
        id: null,
        nombre: null,
        descripcion: null,
        cuit: null,
        banner: null,
        plan: null,
        avatar: null,
        telefono: null,
        domicilio: null,
        email: null,
        created_at: null,
        updated_at: null,
        activo: true,
        socio_cic: true,
        productos: null,
        marcas: null,
        catComId: null,
        usuarios: null,
        mp_trans_banc: false,
        mp_abono_contra: false,
        mp_pago_posnet: false,
        mp_acuerdo_vendedor: true,
        mp_pago_sucursal: false,
        mp_mercadopago: false,
        mp_mercadopago_qr: false,
        e_delivery: false,
        e_acuerdo_vendedor: true,
        e_retiro_sucursal: false,
        access_token: null,
        auth_code: null,
        last_update_token: null,
        refresh_token: null,
    };
}
