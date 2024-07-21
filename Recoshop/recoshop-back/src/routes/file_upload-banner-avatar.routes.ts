import { Request, Response, NextFunction } from 'express';
import * as mw from './auth_mw';
import multer from 'multer';
import { ProductosController } from '../controllers/productos.controller';
import { ComerciosController } from '../controllers/comercios.controller';
import { SERVER_IMAGES_URL } from '../constants';

interface MulterRequest extends Request {
    file: any;
}

// Post imagenes
let storage = multer.diskStorage({
    destination: (req: Request, file, cb) => {
        cb(null, `${SERVER_IMAGES_URL}`);
    },
    filename: (req: Request, file, cb) => {
        console.log('FILE', file);
        cb(null, `${Date.now()}-ban-avat-${file.originalname}`);
    },
});

const upload = multer({ storage });

export class FilesUploadBannAvatRouter {
    public ctlProductos: ProductosController = new ProductosController();
    public ctlComercios: ComerciosController = new ComerciosController();

    public routes(app): void {
        app.route('/api/v1/comercio/banner').post(
            mw.jwtComercianteMidleware,
            upload.single('file'),
            (req: MulterRequest, res: Response, next: NextFunction) => {
                console.log(
                    `Storage location id ${req.hostname}/${req.file.path}`,
                );
                console.log(req.file);
                next();
            },
            this.ctlComercios.createBanner,
        );

        app.route('/api/v1/comercio/avatar').post(
            mw.jwtComercianteMidleware,
            upload.single('file'),
            (req: MulterRequest, res: Response, next: NextFunction) => {
                console.log(
                    `Storage location id ${req.hostname}/${req.file.path}`,
                );
                console.log(req.file);
                next();
            },
            this.ctlComercios.createAvatar,
        );
    }
}
