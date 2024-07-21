import { Request, Response, NextFunction } from 'express';
import { PedidosLineasController } from '../controllers/pedidos_lineas.controller';
import * as mw from './auth_mw';

export class PedidosLineaRouter {
    public controlador: PedidosLineasController = new PedidosLineasController();

    public routes(app): void {
        app.route('/api/v1/pedidoslineas')
            .get(
                (req: Request, res: Response, next: NextFunction) => {
                    next();
                },
                mw.jwtAdminMidleware,
                this.controlador.getPedidosLineas,
            )
            .post(this.controlador.createPedidosLinea);

        app.route('/api/v1/pedidolinea/:id')
            .get(mw.jwtAdminMidleware, this.controlador.getPedidoLinea)
            .put(mw.jwtAdminMidleware, this.controlador.updatePedidoLinea)
            .delete(mw.jwtAdminMidleware, this.controlador.deletePedidoLinea);
    }
}
