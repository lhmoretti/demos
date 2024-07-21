import express from 'express';
import { Request, Response, NextFunction } from 'express';
import { UsuariosAuthController } from '../controllers/login.controller';

export class LoginRoutes {
    public controlador: UsuariosAuthController = new UsuariosAuthController();

    public routes(router: express.Router) {
        router.route('/login').post(this.controlador.loginUsuario);

        return router;
    }
}
