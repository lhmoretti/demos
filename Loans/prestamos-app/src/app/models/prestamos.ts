import { Clientes } from "./clientes";
import { Pagos } from "./pagos";

export class Prestamos {
  id?: number;
  monto?: number;
  valor_cuota?: number;
  fecha_hora?: Date;
  vencimiento?: Date;
  tasa_interes?: number;
  intereses?: number;
  cantidad_cuotas?: number;
  cuotas_pagadas?: number;
  tipo_pago?: string;
  saldo?: number;
  estado?: string;
  clienteId?: Clientes;
  pagos?: Pagos[];
}
