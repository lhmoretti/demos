import { Usuario } from './usuarios.model';
import { ModoPago } from './modo_pago.model';
import { Lineas } from './linea.model';
import { Comercio } from './comercio.model';

export interface Pedido {
    id?: number;
    fecha_hora?: Date;
    fecha_entrega?: null;
    hora_entrega?: null;
    comentario?: null;
    estado?: string;
    total?: number;
    modo_pago?: string;
    modo_entrega?: string;
    comercioId?: Comercio;
    usuarioId?: Usuario;
    pedido_lineas?: Lineas[];
}
