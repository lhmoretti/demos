import { Request, Response, NextFunction } from 'express';
import { CategoriasComerciosController } from '../controllers/categorias_comercios.controller';
import * as mw from './auth_mw';

export class CategoriasComerciosRouter {
    public controlador: CategoriasComerciosController =
        new CategoriasComerciosController();

    public routes(app): void {
        app.route('/api/v1/categoriascomercios')
            .get((req: Request, res: Response, next: NextFunction) => {
                next();
            }, this.controlador.getCategoriasComercios)
            .post(
                mw.jwtAdminMidleware,
                this.controlador.createCategoriasComercio,
            );

        app.route('/api/v1/categoriacomercio/:id')
            .get(this.controlador.getCategoriasComercio)
            .put(
                mw.jwtAdminMidleware,
                this.controlador.updateCategoriasComercio,
            )
            .delete(
                mw.jwtAdminMidleware,
                this.controlador.deleteCategoriasComercio,
            );
    }
}
