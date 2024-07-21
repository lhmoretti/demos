import { Pagos } from '../entities/pagos.entity.sql';
import { Request, Response, NextFunction } from 'express';
import { FindOneOptions } from 'typeorm/find-options/FindOneOptions';

export class PagosController {
    constructor() {}

    public async getPagos(req: Request, res: Response) {
        await Pagos.find({
            order: { fecha_hora: 'ASC' },
        })
            .then((pago) => {
                res.json(pago);
            })
            .catch((err) => {
                res.json(err.message);
            });
    }

    public async getPago(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        await Pagos.findOne({ id } as FindOneOptions<Pagos>)
            .then((pago) => {
                res.json(pago);
            })
            .catch((err) => {
                res.json(err.message);
            });
    }

    public async createPago(req: Request, res: Response) {
        const pago: Pagos = new Pagos();
        pago.monto = req.body.monto;
        pago.interes = req.body.interes;
        pago.tasa_interes = req.body.tasa_interes;
        pago.fecha_hora = req.body.fecha_hora;
        pago.nro_cuota = req.body.nro_cuota;
        pago.ganancia = req.body.ganancia;
        pago.prestamoId = req.body.prestamoId;

        pago.save()
            .then((u) => {
                res.json(u);
            })
            .catch((err) => {
                res.json(err);
            });
    }

    public async updatePago(req: Request, res: Response) {
        const id = parseInt(req.params.id);

        Pagos.findOne({ id } as FindOneOptions<Pagos>)
            .then(async (pago: Pagos) => {
                pago.monto = req.body.monto;
                pago.interes = req.body.interes;
                pago.tasa_interes = req.body.tasa_interes;
                pago.fecha_hora = req.body.fecha_hora;
                pago.nro_cuota = req.body.nro_cuota;
                pago.ganancia = req.body.ganancia;
                pago.prestamoId = req.body.prestamoId;

                pago.save()
                    .then((u) => {
                        res.json(u);
                    })
                    .catch((err) => {
                        res.json(err);
                    });
            })
            .catch((err) => res.json({ message: 'No se encontró el pago' }));
    }

    public deletePago(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        Pagos.findOne({ id } as FindOneOptions<Pagos>)
            .then((pago) => {
                pago.remove()
                    .then((u) => {
                        res.json(u);
                    })
                    .catch((err) => {
                        res.send(err);
                    });
            })
            .catch((err) => {
                res.json(err.message);
            });
    }

    public async findPaginated(req: Request, res: Response) {
        const pageNro: any = req.query.pageNro;
        const pageSize: any = req.query.pageSize;

        const pagos = await Pagos.findPaginated(pageNro, pageSize);
        res.send({ pagos });
    }
}
