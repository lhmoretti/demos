import { Categorias } from '../Entities/Categorias';
import { Request, Response } from 'express';
import { IMAGES_URL } from '../constants';

interface MulterRequest extends Request {
    file: any;
}

export class CategoriasController {
    constructor() {}

    public async getCategorias(req: Request, res: Response) {
        await Categorias.find({
            order: { categoria: 'ASC' },
        })
            .then((categoria) => {
                res.json(categoria);
            })
            .catch((err) => {
                res.send(err);
            });
    }

    public async getCategoriasActivas(req: Request, res: Response) {
        await Categorias.find({
            where: { activo: true },
            order: { categoria: 'ASC' },
        })
            .then((categoria) => {
                res.json(categoria);
            })
            .catch((err) => {
                res.send(err);
            });
    }

    public async getCategoria(req: Request, res: Response) {
        let id = parseInt(req.params.id);
        await Categorias.findOne({ id })
            .then((categoria) => {
                res.json(categoria);
            })
            .catch((err) => {
                res.send(err);
            });
    }

    public createCategoria(req: MulterRequest, res: Response) {
        const categoria = new Categorias();
        categoria.categoria = req.body.categoria;
        categoria.url_img = `${IMAGES_URL}/${req.file.filename}`;
        categoria.activo = req.body.activo;
        categoria
            .save()
            .then((categoria) => {
                res.json(categoria);
            })
            .catch((err) => {
                res.send(err);
            });
    }

    public updateCategoria(req: Request, res: Response) {
        let id = parseInt(req.params.id);
        Categorias.findOne({ id })
            .then((categoria: Categorias) => {
                categoria.categoria = req.body.categoria;
                categoria.activo = req.body.activo;
                categoria
                    .save()
                    .then((categoria) => {
                        res.json(categoria);
                    })
                    .catch((err) => {
                        res.send(err);
                    });
            })
            .catch((err) => {
                res.send(err);
            });
    }

    public deleteCategoria(req: Request, res: Response) {
        let id = parseInt(req.params.id);
        Categorias.findOne({ id })
            .then((categoria) => {
                categoria
                    .remove()
                    .then((categoria) => {
                        res.json(categoria);
                    })
                    .catch((err) => {
                        res.send(err);
                    });
            })
            .catch((err) => {
                res.send(err);
            });
    }
}
