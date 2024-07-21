import { Pedidos } from '../Entities/Pedidos';
import { Request, Response } from 'express';
import { ProductosController } from './productos.controller';

export class PedidosController {
    constructor() {}

    public async getPedidosPagina(req: Request, res: Response) {
        let pageNro: any = req.query.pageNro || 0;
        let pageSize: any = req.query.pageSize;
        let estado: any = req.query.estado;

        await Pedidos.findPaginatedByEstado(pageNro, pageSize, estado)
            .then((pedidos) => {
                res.json({ pedidos });
            })
            .catch((err) => console.log('Error', err));
    }

    public async getPedidos(req: Request, res: Response) {
        await Pedidos.find({
            order: { fecha_hora: 'ASC' },
            relations: ['comercioId', 'usuarioId', 'pedido_lineas'],
        })
            .then((pedido) => {
                res.json(pedido);
            })
            .catch((err) => {
                res.send(err);
            });
    }

    public async getPedido(req: Request, res: Response) {
        let id = parseInt(req.params.id);
        await Pedidos.findOne(
            { id },
            { relations: ['comercioId', 'usuarioId', 'pedido_lineas'] },
        )
            .then((pedido) => {
                res.json(pedido);
            })
            .catch((err) => {
                res.send(err);
            });
    }

    public async getPaginatedByEstadoAndComercio(req: Request, res: Response) {
        let pageNro: any = req.query.pageNro || 0;
        let pageSize: any = req.query.pageSize;
        let idCom: any = req.params.id;
        let est: any = req.params.est;

        await Pedidos.getPaginatedByEstadoAndComercio(
            pageNro,
            pageSize,
            est,
            idCom,
        )
            .then((pedidos) => {
                res.json({ pedidos });
            })
            .catch((err) => console.log('Error', err));
    }

    public async getPaginatedByEstadoAndUser(req: Request, res: Response) {
        let pageNro: any = req.query.pageNro || 0;
        let pageSize: any = req.query.pageSize;
        let idUsuario: any = req.params.id;
        let est: any = req.params.est;

        await Pedidos.getPaginatedByEstadoAndUser(
            pageNro,
            pageSize,
            est,
            idUsuario,
        )
            .then((pedidos) => {
                res.json({ pedidos });
            })
            .catch((err) => console.log('Error', err));
    }

    public async getPaginatedByUser(req: Request, res: Response) {
        let pageNro: any = req.query.pageNro || 0;
        let pageSize: any = req.query.pageSize;
        let idUsuario: any = req.params.id;

        await Pedidos.getPaginatedByUser(pageNro, pageSize, idUsuario)
            .then((pedidos) => {
                res.json({ pedidos });
            })
            .catch((err) => console.log('Error', err));
    }

    public async createPedido(req: Request, res: Response) {
        let prodCtrl = new ProductosController();

        const pedido = new Pedidos();
        pedido.fecha_hora = req.body.fecha_hora;
        pedido.fecha_entrega = req.body.fecha_entrega;
        pedido.hora_entrega = req.body.hora_entrega;
        pedido.comentario = req.body.comentario;
        pedido.estado = req.body.estado;
        pedido.total = req.body.total;
        pedido.ext_ref = req.body.ext_ref;
        pedido.modo_entrega = req.body.modo_entrega;
        pedido.modo_pago = req.body.modo_pago;
        pedido.usuarioId = req.body.usuarioId;
        pedido.comercioId = req.body.comercioId;
        pedido.pedido_lineas = req.body.pedido_lineas;

        for (let i of pedido.pedido_lineas) {
            console.log(i);
            let resp = await prodCtrl.updateStockProducto(i);
            console.log(resp);
        }

        pedido
            .save()
            .then((m) => {
                res.json(m);
            })
            .catch((err) => {
                res.send(err);
            });
    }

    public updatePedido(req: Request, res: Response) {
        let id = parseInt(req.params.id);
        Pedidos.findOne({ id })
            .then((pedido) => {
                pedido.estado = req.body.estado;
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

    public deletePedido(req: Request, res: Response) {
        let id = parseInt(req.params.id);
        Pedidos.findOne({ id })
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
