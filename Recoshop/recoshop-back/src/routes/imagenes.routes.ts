import { Request, Response, NextFunction } from 'express';
import { ImagenesController } from '../controllers/imagenes.controller';
import * as mw from './auth_mw';

export class ImagenesRouter {
    public controlador: ImagenesController = new ImagenesController();

    public routes(app): void {
        app.route('/api/v1/imagenes')
            .get((req: Request, res: Response, next: NextFunction) => {
                // console.log(`Request from: ${req.originalUrl}`);
                // console.log(`Request type: ${req.method}`);
                next();
            }, this.controlador.getImagenes)
            .post(mw.jwtComercianteMidleware, this.controlador.createImagenes);

        app.route('/api/v1/imagen/:id')
            .get(this.controlador.getImagen)
            .put(mw.jwtComercianteMidleware, this.controlador.updateImagen)
            .delete(mw.jwtComercianteMidleware, this.controlador.deleteImagen);
    }
}
