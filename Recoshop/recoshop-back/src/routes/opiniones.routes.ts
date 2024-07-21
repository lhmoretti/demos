import { Request, Response, NextFunction } from 'express';
import { OpinionesController } from '../controllers/opiniones.controller';

export class OpinionesRouter {
    public controlador: OpinionesController = new OpinionesController();

    public routes(app): void {
        app.route('/api/v1/opiniones')
            .get((req: Request, res: Response, next: NextFunction) => {
                next();
            }, this.controlador.getOpiniones)
            .post(this.controlador.createOpinion);

        app.route('/api/v1/opiniones/producto/:id').get(
            this.controlador.getOpinionesArticulo,
        );

        app.route('/api/v1/opiniones/:id')
            .get(this.controlador.getOpinion)
            .put(this.controlador.updateOpinion)
            .delete(this.controlador.deleteOpinion);
    }
}
