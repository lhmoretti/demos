import { Usuarios } from './Usuarios';
import { PedidosLineas } from './PedidosLineas';
// import { ModoPagos } from './ModoPagos';

export class Pedidos {
    id: number;
    fecha_hora: Date;
    fecha_entrega: Date;
    hora_entrega: string;
    comentario: string;
    estado: string;
    total: number;
    modo_entrega: string;
    usuarioId: Usuarios;
    modo_pago: string;
    ext_ref: string;
    pedido_lineas: PedidosLineas[];
}
