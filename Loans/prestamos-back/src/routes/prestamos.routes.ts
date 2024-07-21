import express from 'express';
import { Request, Response, NextFunction } from 'express';
import { PrestamosController } from '../controllers/prestamos.controller';
import * as mw from '../middlewares/auth.middleware';
import { ADMIN, SUPERADMIN } from '../helpers/roles';

export class PrestamosRouter {
    public controlador: PrestamosController = new PrestamosController();

    public routes(router: express.Router) {
        router
            .route('/prestamos')
            .get(mw.isAllowed([SUPERADMIN]), this.controlador.getPrestamos)
            .post(mw.isAllowed([SUPERADMIN]), this.controlador.createPrestamo);

        router
            .route('/prestamo/:id')
            .get(mw.isAllowed([SUPERADMIN]), this.controlador.getPrestamo)
            .put(mw.isAllowed([SUPERADMIN]), this.controlador.updatePrestamo)
            .delete(
                mw.isAllowed([SUPERADMIN]),
                this.controlador.deletePrestamo,
            );

        router
            .route('/prestamos/usuario/:id')
            .get(
                mw.isAllowed([SUPERADMIN]),
                this.controlador.getPrestamoByIdUsuario,
            );

        router
            .route('/prestamos/paginado')
            .get(
                mw.isAllowed([SUPERADMIN]),
                this.controlador.findPaginaByEstado,
            );

        return router;
    }
}
