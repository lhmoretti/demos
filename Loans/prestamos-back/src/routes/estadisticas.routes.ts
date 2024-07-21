import express from 'express';
import { Request, Response, NextFunction } from 'express';
import { EstadisticasController } from '../controllers/estadisticas.controller';
import * as mw from '../middlewares/auth.middleware';
import { ADMIN, SUPERADMIN } from '../helpers/roles';

export class EstadisticasRouter {
    public controlador: EstadisticasController = new EstadisticasController();

    public routes(router: express.Router) {
        router
            .route('/estadisticas/ganancias/desde/:desde/hasta/:hasta')
            .get(mw.isAllowed([SUPERADMIN]), this.controlador.getGanancias);

        router
            .route('/estadisticas/prestamos/desde/:desde/hasta/:hasta')
            .get(mw.isAllowed([SUPERADMIN]), this.controlador.getCantPrestamos);

        router
            .route('/estadisticas/pagos/desde/:desde/hasta/:hasta')
            .get(mw.isAllowed([SUPERADMIN]), this.controlador.getCantPagos);

        router
            .route('/estadisticas/prestado/desde/:desde/hasta/:hasta')
            .get(mw.isAllowed([SUPERADMIN]), this.controlador.getPrestado);

        router
            .route('/estadisticas/ingresado/desde/:desde/hasta/:hasta')
            .get(mw.isAllowed([SUPERADMIN]), this.controlador.getIngresado);

        return router;
    }
}
