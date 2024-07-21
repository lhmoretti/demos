import { Comercio } from './comercio.model';

export interface Lineas {
    id_prod?: number;
    cantidad?: number;
    nombre?: string;
    descripcion?: string;
    precio_venta?: number;
    img?: string;
    unidad?: number;
    precio_oferta?: number;
    comercioId?: any;
    oferta?: boolean;
}
