import { Marcas } from '../Entities/Marcas';
import { Request, Response } from 'express';

export class MarcasController {
    constructor() {}

    public async getMarcas(req: Request, res: Response) {
        await Marcas.find({
            order: { marca: 'ASC' },
            relations: ['comercioId'],
        })
            .then((marca) => {
                res.json(marca);
            })
            .catch((err) => {
                res.send(err);
            });
    }

    public async getMarcasByCatAndCom(req: Request, res: Response) {
        let idCat = parseInt(req.params.idCat);
        let idCom = parseInt(req.params.idCom);
        await Marcas.find({
            relations: ['comercioId'],
            where: { categoriaId: idCat, comercioId: idCom },
            order: { marca: 'ASC' },
        })
            .then((marcas) => {
                res.json(marcas);
            })
            .catch((err) => {
                res.send(err);
            });
    }

    public async getMarcasByCom(req: Request, res: Response) {
        let id = parseInt(req.params.id);
        await Marcas.find({
            relations: ['comercioId'],
            where: { comercioId: id },
            order: { marca: 'ASC' },
        })
            .then((marcas) => {
                res.json(marcas);
            })
            .catch((err) => {
                res.send(err);
            });
    }

    public async getMarca(req: Request, res: Response) {
        let id = parseInt(req.params.id);
        await Marcas.findOne({ id }, { relations: ['comercioId'] })
            .then((marca) => {
                res.json(marca);
            })
            .catch((err) => {
                res.send(err);
            });
    }

    public createMarca(req: Request, res: Response) {
        const marca = new Marcas();
        marca.marca = req.body.marca;
        marca.comercioId = req.body.comercioId;

        marca
            .save()
            .then((m) => {
                res.json(m);
            })
            .catch((err) => {
                res.send(err);
            });
    }

    public updateMarca(req: Request, res: Response) {
        let id = parseInt(req.params.id);
        Marcas.findOne({ id })
            .then((marca) => {
                marca.marca = req.body.marca;
                marca.comercioId = req.body.comercioId;
                marca
                    .save()
                    .then((m) => {
                        res.json(m);
                    })
                    .catch((err) => {
                        res.send(err);
                    });
            })
            .catch((err) => {
                res.send(err);
            });
    }

    public deleteMarca(req: Request, res: Response) {
        let id = parseInt(req.params.id);
        Marcas.findOne({ id })
            .then((marca) => {
                marca
                    .remove()
                    .then((m) => {
                        res.json(m);
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
