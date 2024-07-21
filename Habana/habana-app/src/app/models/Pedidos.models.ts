import { Mesas } from "./Mesas.model";
import { Productos } from "./Productos.models";
import { Empleados } from "./Empleados.model";

export interface Pedido {
    _id?: string;
    fecha?: string;
    hora?: string;
    mesa?: Mesas;
    usuario?: Empleados;
    productos?: Productos[];
    apellido_cliente?: string;
    descripcion?: null | string;
    estado?: string;
    nro_pedido?: number;
}
