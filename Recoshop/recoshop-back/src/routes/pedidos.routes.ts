import { Request, Response, NextFunction } from 'express';
import { PedidosController } from '../controllers/pedidos.controller';
import * as mw from './auth_mw';

export class PedidosRouter {
    public controlador: PedidosController = new PedidosController();

    public routes(app): void {
        app.route('/api/v1/pedidos')
            .get(
                (req: Request, res: Response, next: NextFunction) => {
                    next();
                },
                mw.jwtAdminMidleware,
                this.controlador.getPedidos,
            )
            .post(this.controlador.createPedido);

        app.route('/api/v1/pedido/:id')
            .get(this.controlador.getPedido)
            .put(mw.jwtComercianteMidleware, this.controlador.updatePedido)
            .delete(mw.jwtComercianteMidleware, this.controlador.deletePedido);

        app.route('/api/v1/pedidos/paginado/comercio/:id/estado/:est').get(
            mw.jwtComercianteMidleware,
            this.controlador.getPaginatedByEstadoAndComercio,
        );

        app.route('/api/v1/pedidos/paginado/usuario/:id/estado/:est').get(
            this.controlador.getPaginatedByEstadoAndUser,
        );

        app.route('/api/v1/pedidos/paginado/usuario/:id').get(
            this.controlador.getPaginatedByUser,
        );

        app.route('/api/v1/pedidos/paginado').get(
            mw.jwtAdminMidleware,
            this.controlador.getPedidosPagina,
        );
    }
}
