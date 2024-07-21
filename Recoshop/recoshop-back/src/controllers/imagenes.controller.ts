import { Imagenes } from '../Entities/Imagenes';
import { Request, Response, NextFunction } from 'express';

export class ImagenesController {
    constructor() {}

    public async getImagenes(req: Request, res: Response) {
        await Imagenes.find({
            order: { id: 'ASC' },
        })
            .then((imagen) => {
                res.json(imagen);
            })
            .catch((err) => {
                res.send(err);
            });
    }

    public async getImagen(req: Request, res: Response) {
        let id = parseInt(req.params.id);
        await Imagenes.findOne({ id })
            .then((img) => {
                res.json(img);
            })
            .catch((err) => {
                res.send(err);
            });
    }

    public createImgFromArt(req: Request, res: Response, imagen) {
        let img = Imagenes.create();
        img = imagen;
        img.save()
            .then((img) => {
                console.log('ID IMAGEN CTL IMG');
                res.send(img);
                return img.id;
            })
            .catch((err) => {
                res.send(err);
                return err;
            });
    }

    public createImagenes(req: Request, res: Response) {
        let img = Imagenes.create();
        img = req.body;
        img.save()
            .then((img) => {
                res.json(img);
            })
            .catch((err) => {
                res.send(err);
            });
    }

    public updateImagen(req: Request, res: Response) {
        let id = parseInt(req.params.id);
        Imagenes.findOne({ id }).then((img) => {
            img.img_thumb = req.body.img_thumb;
            img.url = req.body.url;
            img.producto = req.body.producto;
            img.save()
                .then((img) => {
                    res.json(img);
                })
                .catch((err) => {
                    res.send(err);
                });
        });
    }

    public deleteImagen(req: Request, res: Response) {
        let id = parseInt(req.params.id);
        Imagenes.findOne({ id })
            .then((img) => {
                img.remove()
                    .then((img) => {
                        res.json(img);
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
