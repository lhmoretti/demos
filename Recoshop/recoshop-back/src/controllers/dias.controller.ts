import { Dias } from '../Entities/Dias';
import { Request, Response } from 'express';

export class DiasController {
    constructor() {}

    public async getDias(req: Request, res: Response) {
        await Dias.find({
            order: {
                dia: 'ASC',
            },
            relations: ['horarios'],
        })
            .then((dia) => {
                res.json(dia);
            })
            .catch((err) => {
                res.send(err);
            });
    }

    public async getDia(req: Request, res: Response) {
        let id = parseInt(req.params.id);
        await Dias.findOne({ id }, { relations: ['horarios'] })
            .then((dia) => {
                res.json(dia);
            })
            .catch((err) => {
                res.send(err);
            });
    }

    public createDia(req: Request, res: Response) {
        let dia = Dias.create();
        dia = req.body;
        dia.save()
            .then((a) => {
                res.json(a);
            })
            .catch((err) => {
                res.send(err);
            });
    }

    public updateDia(req: Request, res: Response) {
        let id = parseInt(req.params.id);
        Dias.findOne({ id }).then((dia) => {
            dia.dia = req.body.dia;
            dia.activo = req.body.activo;
            dia.horarios = req.body.horarios;
            dia.save()
                .then((d) => {
                    res.json(d);
                })
                .catch((err) => {
                    res.send(err);
                });
        });
    }

    public deleteDia(req: Request, res: Response) {
        let id = parseInt(req.params.id);
        Dias.findOne({ id })
            .then((dia) => {
                dia.remove()
                    .then((d) => {
                        res.json(d);
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
