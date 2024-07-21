import { Request, Response, NextFunction } from 'express';
import { DiasController } from '../controllers/dias.controller';
import * as mw from './auth_mw';

export class DiasRouter {
    public controlador: DiasController = new DiasController();

    public routes(app): void {
        app.route('/api/v1/dias')
            .get((req: Request, res: Response, next: NextFunction) => {
                next();
            }, this.controlador.getDias)
            .post(mw.jwtComercianteMidleware, this.controlador.createDia);

        app.route('/api/v1/dia/:id')
            .get(this.controlador.getDia)
            .put(mw.jwtComercianteMidleware, this.controlador.updateDia)
            .delete(mw.jwtComercianteMidleware, this.controlador.deleteDia);
    }
}
