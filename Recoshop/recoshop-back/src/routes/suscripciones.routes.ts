import { Request, Response, NextFunction } from 'express';
import { SuscripcionesController } from '../controllers/subscripcion.controller';
import * as mw from './auth_mw';

export class SuscripcionsRouter {
    public controlador: SuscripcionesController = new SuscripcionesController();

    public routes(app): void {
        app.route('/api/v1/suscripciones')
            .get((req: Request, res: Response, next: NextFunction) => {
                next();
            }, this.controlador.getSuscripciones)
            .post(this.controlador.createSuscripcion);

        app.route('/api/v1/suscripcion/:id')
            .get(this.controlador.getSuscripcion)
            .delete(mw.jwtAdminMidleware, this.controlador.deleteSuscripcion);

        app.route('/api/v1/suscripciones/paginado').get(
            this.controlador.getSuscripcionesPagina,
        );
    }
}
