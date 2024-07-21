import { Payer } from './payer.model';
import { Items } from './items.model';

export class MercadoPago {
    payer?: Payer;
    items?: Items[];
    idPedido?: any;
    idComercio?: any;
}
