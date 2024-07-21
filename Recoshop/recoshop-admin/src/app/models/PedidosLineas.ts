import { Pedidos } from './Pedidos';

export class PedidosLineas {
    id: number;
    id_prod: number;
    cantidad: number;
    unidad: number;
    nombre: string;
    descripcion: string;
    precio_venta: number;
    precio_oferta: number;
    oferta: boolean;
    pedido: Pedidos[];
}
