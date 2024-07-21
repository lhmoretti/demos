import express from 'express';
import { Request, Response, NextFunction } from 'express';
import { ModulosController } from '../controllers/modulos.controller';
import * as mw from '../middlewares/auth.middleware';
import { SUPERADMIN } from '../helpers/roles';

export class ModulosRouter {
    public controlador: ModulosController = new ModulosController();

    public routes(router: express.Router) {
        router
            .route('/modulos')
            .get(mw.isAllowed([SUPERADMIN]), this.controlador.getAll)
            .post(mw.isAllowed([SUPERADMIN]), this.controlador.create);

        router
            .route('/modulos/paginado')
            .get(mw.isAllowed([SUPERADMIN]), this.controlador.getPaginated);

        router
            .route('/modulo/:id')
            .get(mw.isAllowed([SUPERADMIN]), this.controlador.get)
            .put(mw.isAllowed([SUPERADMIN]), this.controlador.update)
            .delete(mw.isAllowed([SUPERADMIN]), this.controlador.delete);

        return router;
    }
}
