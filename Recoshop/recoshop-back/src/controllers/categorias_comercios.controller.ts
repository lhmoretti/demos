import { CategoriasComercios } from '../Entities/CategoriasComercios';
import { Request, Response } from 'express';

export class CategoriasComerciosController {
    constructor() {}

    public async getCategoriasComercios(req: Request, res: Response) {
        await CategoriasComercios.find({
            order: { categoria: 'ASC' },
            relations: ['comercioId'],
        })
            .then((categoria) => {
                res.json(categoria);
            })
            .catch((err) => {
                res.send(err);
            });
    }

    public async getCategoriasComercio(req: Request, res: Response) {
        let id = parseInt(req.params.id);
        await CategoriasComercios.findOne({ id }, { relations: ['comercioId'] })
            .then((categoria) => {
                res.json(categoria);
            })
            .catch((err) => {
                res.send(err);
            });
    }

    public async getCategoriasComerciosByComercio(req: Request, res: Response) {
        let id = parseInt(req.params.id);
        await CategoriasComercios.find({
            relations: ['comercioId'],
            where: { comercioId: id },
        })
            .then((categoria) => {
                res.json(categoria);
            })
            .catch((err) => {
                res.send(err);
            });
    }

    public createCategoriasComercio(req: Request, res: Response) {
        const categoria = new CategoriasComercios();
        categoria.categoria = req.body.categoria;
        categoria.comercioId = req.body.comercioId;
        categoria
            .save()
            .then((categoria) => {
                res.json(categoria);
            })
            .catch((err) => {
                res.send(err);
            });
    }

    public updateCategoriasComercio(req: Request, res: Response) {
        let id = parseInt(req.params.id);
        CategoriasComercios.findOne({ id })
            .then((categoria: CategoriasComercios) => {
                categoria.categoria = req.body.categoria;
                categoria.comercioId = req.body.comercioId;
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

    public deleteCategoriasComercio(req: Request, res: Response) {
        let id = parseInt(req.params.id);
        CategoriasComercios.findOne({ id })
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
