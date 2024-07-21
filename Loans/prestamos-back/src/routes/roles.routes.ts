import express from 'express';
import { Request, Response, NextFunction } from 'express';
import { RolesController } from '../controllers/roles.controller';
import * as mw from '../middlewares/auth.middleware';
import { SUPERADMIN } from '../helpers/roles';

export class RolesRouter {
    public controlador: RolesController = new RolesController();

    public routes(router: express.Router) {
        router
            .route('/roles')
            .get(mw.isAllowed([SUPERADMIN]), this.controlador.getAll)
            .post(mw.isAllowed([SUPERADMIN]), this.controlador.create);

        // app
        //   .route("/roles/paginado")
        //   .get(mw.isAllowed([SUPERADMIN]), this.controlador.getPaginated);

        router
            .route('/role/:id')
            .get(mw.isAllowed([SUPERADMIN]), this.controlador.get)
            .put(mw.isAllowed([SUPERADMIN]), this.controlador.update)
            .delete(mw.isAllowed([SUPERADMIN]), this.controlador.delete);

        return router;
    }
}
