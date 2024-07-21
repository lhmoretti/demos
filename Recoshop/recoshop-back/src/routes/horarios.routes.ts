import { Request, Response, NextFunction } from 'express';
import { HorariosController } from '../controllers/horarios.controller';
import * as mw from './auth_mw';

export class HorariosRouter {
    public controlador: HorariosController = new HorariosController();

    public routes(app): void {
        app.route('/api/v1/horarios')
            .get((req: Request, res: Response, next: NextFunction) => {
                next();
            }, this.controlador.getHorarios)
            .post(mw.jwtComercianteMidleware, this.controlador.createHorario);

        app.route('/api/v1/horario/:id')
            .get(this.controlador.getHorario)
            .put(mw.jwtComercianteMidleware, this.controlador.updateHorario)
            .delete(mw.jwtComercianteMidleware, this.controlador.deleteHorario);
    }
}
