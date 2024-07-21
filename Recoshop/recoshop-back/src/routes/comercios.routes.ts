import { Request, Response, NextFunction } from 'express';
import { ComerciosController } from '../controllers/comercios.controller';
import * as mw from './auth_mw';

export class ComerciosRouter {
    public controlador: ComerciosController = new ComerciosController();

    public routes(app): void {
        app.route('/api/v1/comercios')
            .get((req: Request, res: Response, next: NextFunction) => {
                next();
            }, this.controlador.getComercios)
            .post(this.controlador.createComercio);

        app.route('/api/v1/comercio/:id')
            .get(this.controlador.getComercio)
            .put(mw.jwtComercianteMidleware, this.controlador.updateComercio)
            .delete(mw.jwtAdminMidleware, this.controlador.deleteComercio);

        app.route('/api/v1/comercios/paginado').get(
            this.controlador.getComerciosPagina,
        );

        app.route('/api/v1/comercios/deshabilitar/:id').put(
            mw.jwtAdminMidleware,
            this.controlador.deshabilitar,
        );

        app.route('/api/v1/comercios/habilitar/:id').put(
            mw.jwtAdminMidleware,
            this.controlador.habilitar,
        );

        app.route('/api/v1/comercios/habilitados').get(
            this.controlador.getComerciosHabilitados,
        );

        app.route('/api/v1/comercios/deshabilitados').get(
            this.controlador.getComerciosDeshabilitados,
        );

        app.route('/api/v1/comercios/categorias/:id').get(
            this.controlador.getComerciosByIDCategoria,
        );

        app.route('/api/v1/comercios/usuario/:id').get(
            this.controlador.getComerciosByIdUsuario,
        );

        // app.route('/api/v1/comercios/faker')
        //     .post(mw.jwtAdminMidleware, this.controlador.createComercioFaker);

        app.route('/api/v1/comercios/correos').get(this.controlador.getCorreos);
        //mw.jwtAdminMidleware
    }
}
