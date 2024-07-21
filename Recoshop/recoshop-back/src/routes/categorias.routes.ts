import { Request, Response, NextFunction } from 'express';
import { CategoriasController } from '../controllers/categorias.controller';
import * as mw from './auth_mw';
import multer from 'multer';
import { SERVER_IMAGES_URL } from '../constants';

interface MulterRequest extends Request {
    file: any;
}

// Post imagenes
let storage = multer.diskStorage({
    destination: (req: Request, file, cb) => {
        cb(null, SERVER_IMAGES_URL);
    },
    filename: (req: Request, file, cb) => {
        console.log('FILE', file);
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({ storage });
export class CategoriasRouter {
    public controlador: CategoriasController = new CategoriasController();

    public routes(app): void {
        app.route('/api/v1/categorias').get(
            (req: Request, res: Response, next: NextFunction) => {
                next();
            },
            this.controlador.getCategorias,
        );

        app.route('/api/v1/categorias/activas').get(
            this.controlador.getCategoriasActivas,
        );

        app.route('/api/v1/categoria/:id')
            .get(this.controlador.getCategoria)
            .put(mw.jwtAdminMidleware, this.controlador.updateCategoria)
            .delete(mw.jwtAdminMidleware, this.controlador.deleteCategoria);

        app.route('/api/v1/files/categoria').post(
            mw.jwtAdminMidleware,
            upload.single('file'),
            (req: MulterRequest, res: Response, next: NextFunction) => {
                // console.log(`Storage location id ${req.hostname}/${req.file.path}`);
                next();
            },
            this.controlador.createCategoria,
        );
    }
}
