import { Request, Response, NextFunction } from 'express';
import * as mw from './auth_mw';
import multer from 'multer';
import { ProductosController } from '../controllers/productos.controller';

interface MulterRequest extends Request {
    file: any;
}

// Post imagenes
let storage = multer.diskStorage({
    destination: (req: Request, file, cb) => {
        cb(null, '/var/www/your-domain.com.ar/archivos-csv');
    },
    filename: (req: Request, file, cb) => {
        console.log('FILE', file);
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({ storage });

export class FilesUploadCsvRouter {
    public ctlProductos: ProductosController = new ProductosController();

    public routes(app): void {
        app.route('/api/v1/productos/csvimport').post(
            upload.single('file'),
            (req: MulterRequest, res: Response, next: NextFunction) => {
                console.log(req.file);
                next();
            },
            this.ctlProductos.importProductosCSV,
        );

        app.route('/api/v1/productos/csvimport/post').post(
            (req: Request, res: Response, next: NextFunction) => {
                next();
            },
            this.ctlProductos.postProductosCSV,
        );
    }
}
