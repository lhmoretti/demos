import { Horarios } from '../Entities/Horarios';
import { Request, Response } from 'express';

export class HorariosController {
    constructor() {}

    public async getHorarios(req: Request, res: Response) {
        await Horarios.find({
            order: { horario: 'ASC' },
        })
            .then((horario) => {
                res.json(horario);
            })
            .catch((err) => {
                res.send(err);
            });
    }

    public async getHorario(req: Request, res: Response) {
        let id = parseInt(req.params.id);
        await Horarios.findOne({ id })
            .then((horario) => {
                res.json(horario);
            })
            .catch((err) => {
                res.send(err);
            });
    }

    public createHorario(req: Request, res: Response) {
        let horario = Horarios.create();
        horario = req.body;
        horario
            .save()
            .then((c) => {
                res.json(c);
            })
            .catch((err) => {
                res.send(err);
            });
    }

    public updateHorario(req: Request, res: Response) {
        let id = parseInt(req.params.id);
        Horarios.findOne({ id }).then((horario) => {
            horario.horario = req.body.horario;
            horario
                .save()
                .then((c) => {
                    res.json(c);
                })
                .catch((err) => {
                    res.send(err);
                });
        });
    }

    public deleteHorario(req: Request, res: Response) {
        let id = parseInt(req.params.id);
        Horarios.findOne({ id })
            .then((horario) => {
                horario
                    .remove()
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
}
