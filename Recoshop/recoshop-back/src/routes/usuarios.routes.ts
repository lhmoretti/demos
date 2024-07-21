import { Request, Response, NextFunction } from 'express';
import { UsuariosController } from '../controllers/usuarios.controller';
import * as mw from './auth_mw';

export class UsuariosRouter {
    public controlador: UsuariosController = new UsuariosController();

    public routes(app): void {
        app.route('/api/v1/usuarios')
            .get(
                (req: Request, res: Response, next: NextFunction) => {
                    next();
                },
                mw.jwtAdminMidleware,
                this.controlador.getUsuarios,
            )
            .post(this.controlador.createUsuario);

        app.route('/api/v1/usuario/:id')
            .get(this.controlador.getUsuario)
            .put(this.controlador.updateUsuario)
            .delete(mw.jwtAdminMidleware, this.controlador.deleteUsuario);

        app.route('/api/v1/usuarios/paginado/role/:id').get(
            this.controlador.findByRolePaginated,
        );

        app.route('/api/v1/usuarios/paginado').get(
            this.controlador.findByTxtPaginated,
        );

        app.route('/api/v1/usuarios/recpass/:recpass').get(
            this.controlador.findByRecpass,
        );

        app.route('/api/v1/usuario/updatepass/:id').put(
            this.controlador.updatePasswordUsuario,
        );

        app.route('/api/v1/usuarioavendedor/:id').put(
            this.controlador.usuarioAVendedor,
        );

        app.route('/api/v1/usuarios/faker').post(
            mw.jwtAdminMidleware,
            this.controlador.createUsuarioFaker,
        );
    }
}
