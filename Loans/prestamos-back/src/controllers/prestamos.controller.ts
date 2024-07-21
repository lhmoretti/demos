import { Prestamos } from '../entities/prestamos.entity.sql';
import { Request, Response, NextFunction } from 'express';
import { FindOneOptions } from 'typeorm/find-options/FindOneOptions';

export class PrestamosController {
    constructor() {}

    public async getPrestamos(req: Request, res: Response) {
        await Prestamos.find({
            // order: { fecha_hora: "ASC" },
            relations: ['usuarioId', 'pagos'],
        })
            .then((prestamo) => {
                res.json(prestamo);
            })
            .catch((err) => {
                res.json(err.message);
            });
    }

    public async getPrestamo(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        await Prestamos.find({
            where: { id },
            relations: ['usuarioId', 'pagos'],
        })
            .then((prestamo) => {
                res.json(prestamo);
            })
            .catch((err) => {
                res.json(err.message);
            });
    }

    public async createPrestamo(req: Request, res: Response) {
        const prestamo: Prestamos = new Prestamos();
        prestamo.monto = req.body.monto;
        prestamo.valor_cuota = req.body.valor_cuota;
        prestamo.fecha_hora = req.body.fecha_hora;
        prestamo.vencimiento = req.body.vencimiento;
        prestamo.tasa_interes = req.body.tasa_interes;
        prestamo.intereses = req.body.intereses;
        prestamo.cantidad_cuotas = req.body.cantidad_cuotas;
        prestamo.cuotas_pagadas = req.body.cuotas_pagadas;
        prestamo.tipo_pago = req.body.tipo_pago;
        prestamo.saldo = req.body.saldo;
        prestamo.estado = req.body.estado;
        prestamo.pagos = req.body.pagos;

        prestamo
            .save()
            .then((u) => {
                res.json(u);
            })
            .catch((err) => {
                res.json(err);
            });
    }

    public async updatePrestamo(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        Prestamos.findOne({ id } as FindOneOptions<Prestamos>)
            .then(async (prestamo: Prestamos) => {
                prestamo.monto = req.body.monto;
                prestamo.valor_cuota = req.body.valor_cuota;
                prestamo.fecha_hora = req.body.fecha_hora;
                prestamo.vencimiento = req.body.vencimiento;
                prestamo.tasa_interes = req.body.tasa_interes;
                prestamo.intereses = req.body.intereses;
                prestamo.cantidad_cuotas = req.body.cantidad_cuotas;
                prestamo.cuotas_pagadas = req.body.cuotas_pagadas;
                prestamo.tipo_pago = req.body.tipo_pago;
                prestamo.saldo = req.body.saldo;
                prestamo.estado = req.body.estado;
                prestamo.pagos = req.body.pagos;

                prestamo
                    .save()
                    .then((u) => {
                        res.json(u);
                    })
                    .catch((err) => {
                        res.json(err);
                    });
            })
            .catch((err) =>
                res.json({ message: 'No se encontró el prestamo' }),
            );
    }

    public deletePrestamo(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        Prestamos.findOne({ id } as FindOneOptions<Prestamos>)
            .then((prestamo) => {
                prestamo
                    .remove()
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

    public async findPaginaByEstado(req: Request, res: Response) {
        const pageNro: any = req.query.pageNro;
        const pageSize: any = req.query.pageSize;
        const estado: any = req.query.estado || '';
        const order: any = req.query.order || 'estado'; // columna por la cual ordenar
        const ad: any = req.query.ad || 'ASC'; // ascendiente o descendiente

        const prestamos = await Prestamos.findPaginaByEstado(
            pageNro,
            pageSize,
            estado,
            order,
            ad,
        );
        res.send({ prestamos });
    }

    public async getPrestamoByIdUsuario(req: Request, res: Response) {
        const id: any = req.params.id;
        await Prestamos.find({
            where: { usuarioId: id },
            order: { fecha_hora: 'ASC' },
            relations: ['usuarioId', 'pagos'],
        })
            .then((producto) => {
                res.json(producto);
            })
            .catch((err) => {
                res.send(err);
            });
    }
}
