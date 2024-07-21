import { Marca } from './marca.model';
import { Categoria } from './categoria.model';
import { Comercio } from './comercio.model';

export interface Producto {
    id?: number;
    nombre?: string;
    descripcion?: string;
    unidad?: number;
    precio_costo?: number;
    precio_venta?: number;
    precio_oferta?: number;
    oferta?: boolean;
    promocion?: boolean;
    destacado?: boolean;
    promocion_comercio?: boolean;
    destacado_comercio?: boolean;
    inicio?: boolean;
    disponible?: boolean;
    disponible_compra?: boolean;
    disponible_consulta?: boolean;
    archivado?: boolean;
    rebaja?: null;
    sku?: string;
    ranking?: null;
    stock_actual?: number;
    comercioId?: Comercio;
    marcaId?: Marca;
    categoriaId?: Categoria;
    imagenes?: any[];
}
