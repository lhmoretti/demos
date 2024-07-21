import express from 'express';
import { Request, Response, NextFunction } from 'express';
import { MockController } from '../controllers/mock.controller';
import * as mw from '../middlewares/auth.middleware';
import { ADMIN, SUPERADMIN } from '../helpers/roles';

export class MockRouter {
    public controlador: MockController = new MockController();

    public routes(router: express.Router) {
        router
            .route('/mock')
            .post(mw.isAllowed([SUPERADMIN]), this.controlador.mock);

        return router;
    }
}
