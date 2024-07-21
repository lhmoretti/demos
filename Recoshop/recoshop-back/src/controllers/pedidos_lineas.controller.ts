import { PedidosLineas } from '../Entities/PedidosLineas';
import { Request, Response } from 'express';

export class PedidosLineasController {
    constructor() {}

    public async getPedidosLineas(req: Request, res: Response) {
        await PedidosLineas.find({
            order: { nombre: 'ASC' },
            relations: ['pedido'],
        })
            .then((pedido) => {
                res.json(pedido);
            })
            .catch((err) => {
                res.send(err);
            });
    }

    public async getPedidoLinea(req: Request, res: Response) {
        let id = parseInt(req.params.id);
        await PedidosLineas.findOne({ id }, { relations: ['pedido'] })
            .then((pedido) => {
                res.json(pedido);
            })
            .catch((err) => {
                res.send(err);
            });
    }

    public createPedidosLinea(req: Request, res: Response) {
        let pedido = PedidosLineas.create();
        pedido = req.body;
        pedido
            .save()
            .then((m) => {
                res.json(m);
            })
            .catch((err) => {
                res.send(err);
            });
    }

    public updatePedidoLinea(req: Request, res: Response) {
        let id = parseInt(req.params.id);
        PedidosLineas.findOne({ id })
            .then((pedido) => {
                pedido.id_prod = req.body.id_prod;
                pedido.cantidad = req.body.cantidad;
                pedido.nombre = req.body.nombre;
                pedido.descripcion = req.body.descripcion;
                pedido.precio_venta = req.body.precio_venta;
                pedido.precio_oferta = req.body.precio_oferta;
                pedido.oferta = req.body.oferta;
                pedido
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

    public deletePedidoLinea(req: Request, res: Response) {
        let id = parseInt(req.params.id);
        PedidosLineas.findOne({ id })
            .then((pedido) => {
                pedido
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
