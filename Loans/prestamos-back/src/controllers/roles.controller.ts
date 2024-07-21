import { Roles } from '../entities/roles.entity.sql';
import { Request, Response } from 'express';
import { ApiResponse } from '../api/response';
import { FindOneOptions } from 'typeorm';

export class RolesController {
    constructor() {}

    public getAll(req: Request, res: Response) {
        Roles.find({ order: { role: 'ASC' } })
            .then((data) => ApiResponse({ res, data }))
            .catch((error) => ApiResponse({ res, error }));
    }

    public get(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        Roles.findOne({ id } as FindOneOptions<Roles>)
            .then((data) => ApiResponse({ res, data }))
            .catch((error) => ApiResponse({ res, error }));
    }

    public create(req: Request, res: Response) {
        // const roles = Roles.create({ ...req.body } as Object);
        // delete roles.id;
        // roles
        //     .save()
        //     .then((data) => ApiResponse({ res, data }))
        //     .catch((error) => ApiResponse({ res, error }));
    }

    public update(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        // Roles.findOne({ id })
        //     .then((data: Roles) => {
        //         data.role = req.body.role;
        //         data.descripcion = req.body.descripcion;
        //         data.nivel = req.body.nivel;
        //         data.save()
        //             .then((data) => ApiResponse({ res, data }))
        //             .catch((error) => ApiResponse({ res, error }));
        //     })
        //     .catch((error) => ApiResponse({ res, error }));
    }

    public delete(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        // Roles.findOne({ id })
        //     .then((data) => {
        //         data.remove()
        //             .then((data) => ApiResponse({ res, data }))
        //             .catch((error) => ApiResponse({ res, error }));
        //     })
        //     .catch((err) => {
        //         res.send(err);
        //     });
    }
}
