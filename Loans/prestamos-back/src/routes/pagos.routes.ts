import express from 'express';
import { Request, Response, NextFunction } from 'express';
import { PagosController } from '../controllers/pagos.controller';
import * as mw from '../middlewares/auth.middleware';
import { ADMIN, SUPERADMIN } from '../helpers/roles';

export class PagosRouter {
    public controlador: PagosController = new PagosController();

    public routes(router: express.Router) {
        router
            .route('/pagos')
            .get(
                (req: Request, res: Response, next: NextFunction) => {
                    next();
                },
                mw.isAllowed([SUPERADMIN]),
                this.controlador.getPagos,
            )
            .post(mw.isAllowed([SUPERADMIN]), this.controlador.createPago);

        router
            .route('/pago/:id')
            .get(mw.isAllowed([SUPERADMIN]), this.controlador.getPago)
            .put(mw.isAllowed([SUPERADMIN]), this.controlador.updatePago)
            .delete(mw.isAllowed([SUPERADMIN]), this.controlador.deletePago);

        router
            .route('/pagos/paginado')
            .get(mw.isAllowed([SUPERADMIN]), this.controlador.findPaginated);

        return router;
    }
}
