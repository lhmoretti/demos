import { Modulos } from '../entities/modulos.entity.sql';
import { Request, Response } from 'express';
import { ApiResponse } from '../api/response';

export class ModulosController {
    constructor() {}

    public getAll(req: Request, res: Response) {
        Modulos.find({ order: { modulo: 'ASC' } })
            .then((data) => ApiResponse({ res, data }))
            .catch((error) => ApiResponse({ res, error }));
    }

    public get(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        // Modulos.findOne({ id })
        //     .then((data) => ApiResponse({ res, data }))
        //     .catch((error) => ApiResponse({ res, error }));
    }

    public getPaginated(req: Request, res: Response) {
        const pageNro: any = req.query.pageNro || 0;
        const pageSize: any = req.query.pageSize || 10;

        Modulos.getModulosPaginated(pageNro, pageSize)
            .then((data) => ApiResponse({ res, data }))
            .catch((error) => ApiResponse({ res, error }));
    }

    public create(req: Request, res: Response) {
        const modulo = new Modulos();
        modulo.modulo = req.body.modulo;
        modulo
            .save()
            .then((data) => ApiResponse({ res, data }))
            .catch((error) => ApiResponse({ res, error }));
    }

    public update(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        // Modulos.findOne({ id })
        //     .then((modulo) => {
        //         modulo.modulo = req.body.modulo;
        //         modulo.activo = req.body.activo;
        //         modulo
        //             .save()
        //             .then((data) => ApiResponse({ res, data }))
        //             .catch((error) => ApiResponse({ res, error }));
        //     })
        //     .catch((error) => ApiResponse({ res, error }));
    }

    public delete(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        // Modulos.findOne({ id })
        //     .then((modulo) => {
        //         modulo
        //             .remove()
        //             .then((data) => ApiResponse({ res, data }))
        //             .catch((error) => ApiResponse({ res, error }));
        //     })
        //     .catch((error) => ApiResponse({ res, error }));
    }
}
