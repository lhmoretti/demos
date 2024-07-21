import { Suscripciones } from '../Entities/Suscripciones';
import { Request, Response } from 'express';

export class SuscripcionesController {
    constructor() {}

    public async getSuscripcionesPagina(req: Request, res: Response) {
        let pageNro: any = req.query.pageNro || 0;
        let pageSize: any = req.query.pageSize;

        await Suscripciones.findPaginated(pageNro, pageSize)
            .then((suscripcion) => {
                res.json({ suscripcion });
            })
            .catch((err) => console.log('Error', err));
    }

    public async getSuscripciones(req: Request, res: Response) {
        await Suscripciones.find({
            order: { id: 'ASC' },
        })
            .then((suscripcion) => {
                res.json(suscripcion);
            })
            .catch((err) => {
                res.send(err);
            });
    }

    public async getSuscripcion(req: Request, res: Response) {
        let id = parseInt(req.params.id);
        await Suscripciones.findOne({ id })
            .then((suscripcion) => {
                res.json(suscripcion);
            })
            .catch((err) => {
                res.send(err);
            });
    }

    public createSuscripcion(req: Request, res: Response) {
        const suscripcion = new Suscripciones();
        suscripcion.nombre = req.body.nombre;
        suscripcion.email = req.body.email;

        suscripcion
            .save()
            .then((m) => {
                res.json(m);
            })
            .catch((err) => {
                res.send(err);
            });
    }

    public deleteSuscripcion(req: Request, res: Response) {
        let id = parseInt(req.params.id);
        Suscripciones.findOne({ id })
            .then((suscripcion) => {
                suscripcion
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
