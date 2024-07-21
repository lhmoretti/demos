import { Request, Response, NextFunction } from 'express';
import * as mw from '../middlewares/auth.middleware';
import { LogsController } from '../controllers/logs.controller';
import { SUPERADMIN } from '../helpers/roles';
import express from 'express';

export class LogsRouter {
    public controlador: LogsController = new LogsController();

    public routes(router: express.Router) {
        router.route('/logs').post(this.controlador.testingMongo);

        return router;
    }
}
