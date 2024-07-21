import { Banners } from '../Entities/Banners';
import { Request, Response } from 'express';
import { Imagenes } from '../Entities/Imagenes';
import { IMAGES_URL } from '../constants';

interface MulterRequest extends Request {
    file: any;
}

export class BannersController {
    constructor() {}

    public async getBanners(req: Request, res: Response) {
        await Banners.find({
            order: {
                id: 'DESC',
            },
        })
            .then((banner) => {
                res.json(banner);
            })
            .catch((err) => {
                res.send(err);
            });
    }

    public async getBannersActivos(req: Request, res: Response) {
        await Banners.find({
            order: { id: 'DESC' },
            where: { activo: true },
        })
            .then((banner) => {
                res.json(banner);
            })
            .catch((err) => {
                res.send(err);
            });
    }

    public async getBanner(req: Request, res: Response) {
        let id = parseInt(req.params.id);
        await Banners.findOne({ id })
            .then((banner) => {
                res.json(banner);
            })
            .catch((err) => {
                res.send(err);
            });
    }

    public async createBanner(req: MulterRequest, res: Response) {
        let banner: Banners = new Banners();
        banner.titulo = req.body.titulo;
        banner.descrip = req.body.descrip;
        banner.url = `${IMAGES_URL}/${req.file.filename}`; // Asignamos mismo nombre con el que se guardo el archivo
        banner.activo = req.body.activo;
        banner.link = req.body.link;
        banner
            .save()
            .then((b) => {
                res.json(b);
            })
            .catch((err) => {
                res.send(err);
            });
    }

    public updateBanner(req: Request, res: Response) {
        let id = parseInt(req.params.id);
        Banners.findOne({ id }).then((banner) => {
            banner.titulo = req.body.titulo;
            banner.descrip = req.body.descrip;
            banner.url = req.body.url;
            banner.activo = req.body.activo;
            banner.link = req.body.link;
            banner
                .save()
                .then((d) => {
                    res.json(d);
                })
                .catch((err) => {
                    res.send(err);
                });
        });
    }

    public deleteBanner(req: Request, res: Response) {
        let id = parseInt(req.params.id);
        Banners.findOne({ id })
            .then((banner) => {
                banner
                    .remove()
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
