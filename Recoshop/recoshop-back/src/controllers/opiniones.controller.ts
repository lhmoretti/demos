import { Opiniones } from '../Entities/Opiniones';
import { Request, Response } from 'express';

export class OpinionesController {
    constructor() {}

    public async getOpinionesArticulo(req: Request, res: Response) {
        let artId = parseInt(req.params.id);
        await Opiniones.find({
            where: { producto: artId },
            order: { fecha: 'ASC' },
            relations: ['usuario', 'producto'],
        })
            .then((ops) => {
                res.json(ops);
            })
            .catch((err) => {
                res.send(err);
            });
    }

    public async getOpiniones(req: Request, res: Response) {
        await Opiniones.find({
            order: { fecha: 'ASC' },
            relations: ['usuario', 'producto'],
        })
            .then((ops) => {
                res.json(ops);
            })
            .catch((err) => {
                res.send(err);
            });
    }

    public async getOpinion(req: Request, res: Response) {
        let id = parseInt(req.params.id);
        await Opiniones.findOne({ id }, { relations: ['usuario', 'mecanica'] })
            .then((ops) => {
                res.json(ops);
            })
            .catch((err) => {
                res.send(err);
            });
    }

    public createOpinion(req: Request, res: Response) {
        let ops = Opiniones.create();
        ops = req.body;
        ops.save()
            .then((c) => {
                res.json(c);
            })
            .catch((err) => {
                res.send(err);
            });
    }

    public updateOpinion(req: Request, res: Response) {
        let id = parseInt(req.params.id);
        Opiniones.findOne({ id })
            .then((ops) => {
                ops.opinion = req.body.opinion;
                ops.puntaje = req.body.puntaje;
                ops.fecha = req.body.fecha;
                ops.hora = req.body.hora;
                ops.usuario = req.body.usuario;
                ops.producto = req.body.producto;
                ops.save()
                    .then((c) => {
                        res.json(c);
                    })
                    .catch((err) => {
                        res.send(err);
                    });
            })
            .catch((err) => {
                res.send(err);
            });
    }

    public deleteOpinion(req: Request, res: Response) {
        let id = parseInt(req.params.id);
        Opiniones.findOne({ id })
            .then((ops) => {
                ops.remove()
                    .then((c) => {
                        res.json(c);
                    })
                    .catch((err) => {
                        res.send(err);
                    });
            })
            .catch((err) => {
                res.send(err);
            });
    }

    // public async getOpinionesPagina(req: Request, res: Response) {
    //     console.log(req.query)
    //     let pageNro = parseInt(req.query.pageNro) || 0;
    //     let pageSize = parseInt(req.query.pageSize);
    //     let filter = req.query.filter || '';
    //     let order = req.query.sortOrder;
    //     console.log('Filtro: ' + filter);
    //     if (filter === null) {
    //         let cnt = await Opiniones.createQueryBuilder('ops')
    //             .select("COUNT(*)", "count")
    //             .getRawOne();
    //         let opss = await Opiniones.findPaginated(pageNro, pageSize);
    //         res.send({
    //             "count": cnt,
    //             "data": opss
    //         });
    //     } else {
    //         let cnt = await Opiniones.createQueryBuilder('opss')
    //             .select("COUNT(*)", "count")
    //             .where('opss.nombre LIKE :txt', { txt: '%' + filter + '%' })
    //             .getRawOne();
    //         let opss = await Opiniones.findByNamePaginated(pageNro, pageSize, filter);
    //         res.send({
    //             "count": cnt,
    //             "data": opss
    //         });
    //     }
    // }
}
