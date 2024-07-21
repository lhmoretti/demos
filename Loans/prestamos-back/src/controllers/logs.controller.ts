import { Logs } from '../entities/logs.entity.mongo';
import { Request, Response } from 'express';
import { FindOneOptions } from 'typeorm/find-options/FindOneOptions';
import { mongoDb } from '../data.source.mongo';
import { ApiResponse } from '../api/response';

export class LogsController {
    constructor() {}

    public async getAll(req: Request, res: Response) {
        await mongoDb.manager
            .find(Logs, {
                order: { title: 'ASC' },
            })
            .then((data) => ApiResponse({ res, data }))
            .catch((error) => ApiResponse({ res, error }));
    }

    public async testingMongo(req: Request, res: Response) {
        try {
            const logRepository = mongoDb.getMongoRepository(Logs);
            const log = new Logs();
            log.title = 'Testeando repo!!';
            logRepository.save(log).then((u) => {
                res.json(u);
            });
        } catch (error) {
            console.log(error);
            res.json(error);
        }
    }

    public async get(req: Request, res: Response) {
        const id: number = parseInt(req.params.id);
        const resp = await mongoDb.manager.findOne(Logs, {
            where: id,
        } as FindOneOptions<Logs>);
        res.json(resp);
    }

    public async create(req: Request, res: Response) {
        let log: Logs = new Logs();
        log = { ...req.body };

        try {
            const resp = await mongoDb.manager.save(Logs, log);
            return res.json(resp);
        } catch (e) {
            return res.json(e);
        }
    }

    public async update(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        Logs.findOne({ id } as FindOneOptions<Logs>)
            .then(async (log: Logs) => {
                log.save()
                    .then((data) => ApiResponse({ res, data }))
                    .catch((error) => ApiResponse({ res, error }));
            })
            .catch((error) => ApiResponse({ res, error }));
    }

    public delete(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        Logs.findOne({ id } as FindOneOptions<Logs>)
            .then((log) => {
                log.remove()
                    .then((data) => ApiResponse({ res, data }))
                    .catch((error) => ApiResponse({ res, error }));
            })
            .catch((error) => ApiResponse({ res, error }));
    }
}
