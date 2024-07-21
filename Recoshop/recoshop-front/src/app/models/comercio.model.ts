import { Usuario } from './usuarios.model';
import { Marca } from './marca.model';

export class Comercio {
    id?: number;
    nombre?: string;
    descripcion?: string;
    cuit?: string;
    banner?: string;
    avatar?: string;
    telefono?: string;
    domicilio?: string;
    email?: string;
    created_at?: Date;
    updated_at?: Date;
    plan?: string;
    activo?: boolean;
    socio_cic?: boolean;
    localidad?: string;
    // productos: Productos[];
    mp_acuerdo_vendedor?: boolean;
    mp_mercadopago?: boolean;
    mp_pago_sucursal?: boolean;
    mp_mercadopago_qr?: boolean;
    e_delivery?: boolean;
    e_acuerdo_vendedor?: boolean;
    e_retiro_sucursal?: boolean;
    // categorias: Categorias[];
    marcas?: Marca[];
    // catComId: CategoriasComercios;
    usuarios?: Usuario[];
}
