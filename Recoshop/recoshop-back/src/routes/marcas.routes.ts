import { Request, Response, NextFunction } from 'express';
import { MarcasController } from '../controllers/marcas.controller';
import * as mw from './auth_mw';

export class MarcasRouter {
    public controlador: MarcasController = new MarcasController();

    public routes(app): void {
        app.route('/api/v1/marcas')
            .get(
                (req: Request, res: Response, next: NextFunction) => {
                    next();
                },
                mw.jwtComercianteMidleware,
                this.controlador.getMarcas,
            )
            .post(mw.jwtComercianteMidleware, this.controlador.createMarca);

        app.route('/api/v1/marca/:id')
            .get(this.controlador.getMarca)
            .put(mw.jwtComercianteMidleware, this.controlador.updateMarca)
            .delete(mw.jwtComercianteMidleware, this.controlador.deleteMarca);

        app.route('/api/v1/marcas/comercio/:id').get(
            this.controlador.getMarcasByCom,
        );
    }
}
