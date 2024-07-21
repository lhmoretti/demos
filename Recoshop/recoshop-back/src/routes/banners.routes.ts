import { Request, Response, NextFunction } from 'express';
import { BannersController } from '../controllers/banners.controller';
import * as mw from './auth_mw';
import multer from 'multer';

interface MulterRequest extends Request {
    file: any;
}

// Post imagenes
let storage = multer.diskStorage({
    destination: (req: Request, file, cb) => {
        cb(null, '/var/www/your-domain.com.ar/banners');
    },
    filename: (req: Request, file, cb) => {
        console.log('FILE', file);
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({ storage });

export class BannersRouter {
    public controlador: BannersController = new BannersController();

    public routes(app): void {
        app.route('/api/v1/files/banners').post(
            mw.jwtAdminMidleware,
            upload.single('file'),
            (req: MulterRequest, res: Response, next: NextFunction) => {
                // console.log(`Storage location id ${req.hostname}/${req.file.path}`);
                // console.log(req.file)
                next();
            },
            this.controlador.createBanner,
        );

        app.route('/api/v1/banners')
            .get((req: Request, res: Response, next: NextFunction) => {
                next();
            }, this.controlador.getBanners)
            .post(mw.jwtAdminMidleware, this.controlador.createBanner);

        app.route('/api/v1/banner/:id')
            .get(this.controlador.getBanner)
            .put(mw.jwtAdminMidleware, this.controlador.updateBanner)
            .delete(mw.jwtAdminMidleware, this.controlador.deleteBanner);

        app.route('/api/v1/banners/activos').get(
            this.controlador.getBannersActivos,
        );
    }
}
