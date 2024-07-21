import { Comercios } from '../Entities/Comercios';
import { Request, Response, NextFunction } from 'express';
import { Imagenes } from '../Entities/Imagenes';
import { IMAGES_URL } from '../constants';

interface MulterRequest extends Request {
    file: any;
}

export class ComerciosController {
    constructor() {}

    public async createBanner(req: MulterRequest, res: Response) {
        // Guardamos el ID del comercio para luego buscarlo y asociarlo a la imagen
        let idCom: any = req.query.idCom;
        let idImg: number;
        const img = new Imagenes();
        img.url = `${IMAGES_URL}/${req.file.filename}`; // Asignamos mismo nombre con el que se guardo el archivo

        // Creamos una imagen en la tabla de Imagenes
        await new Promise<void>((resolve, reject) => {
            console.log('Creamos una imagen en la tabla de Imagenes');
            img.save()
                .then((img) => {
                    idImg = img.id;
                    console.log('Se creo la img correctamente');
                    if (idCom) {
                        resolve();
                    } else {
                        res.json(img);
                    }
                })
                .catch((err) => {
                    res.json(err);
                    return reject(err);
                });
        });

        // Si se envió un id de comercio, realizamos lo siguiente, sino, solo se carga la imagen
        if (idCom) {
            // Una vez creada la imagen, buscamos el comercio
            console.log('Creada la imagen, buscamos el comercio');
            Comercios.findOne({ id: idCom })
                .then((com) => {
                    com.banner = `${IMAGES_URL}/${req.file.filename}`;
                    com.save()
                        .then((comercio) => {
                            console.log('Se editó el avatar del comercio');
                            res.json(comercio);
                        })
                        .catch((err) => {
                            res.json(err);
                        });
                })
                .catch((err) => {
                    res.json(err);
                });
        }
    }

    public async createAvatar(req: MulterRequest, res: Response) {
        // Guardamos el ID del comercio para luego buscarlo y asociarlo a la imagen
        let idCom: any = req.query.idCom;
        let idImg: number;
        const img = new Imagenes();
        img.url = `${IMAGES_URL}/${req.file.filename}`; // Asignamos mismo nombre con el que se guardo el archivo

        // Creamos una imagen en la tabla de Imagenes
        await new Promise<void>((resolve, reject) => {
            console.log('Creamos una imagen en la tabla de Imagenes');
            img.save()
                .then((img) => {
                    idImg = img.id;
                    console.log('Se creo la img correctamente');
                    if (idCom) {
                        resolve();
                    } else {
                        res.json(img);
                    }
                })
                .catch((err) => {
                    res.json(err);
                    return reject(err);
                });
        });

        // Si se envió un id de comercio, realizamos lo siguiente, sino, solo se carga la imagen
        if (idCom) {
            // Una vez creada la imagen, buscamos el comercio
            console.log('Creada la imagen, buscamos el comercio');
            Comercios.findOne({ id: idCom })
                .then((com) => {
                    com.avatar = `${IMAGES_URL}/${req.file.filename}`;
                    com.save()
                        .then((comercio) => {
                            console.log('Se editó el avatar del comercio');
                            res.json(comercio);
                        })
                        .catch((err) => {
                            res.json(err);
                        });
                })
                .catch((err) => {
                    res.json(err);
                });
        }
    }

    // public createComercioFaker(req: Request, res: Response) {
    //     let comercio = new Comercios();
    //     comercio.nombre = faker.name.firstName();
    //     comercio.domicilio = faker.address.streetAddress();
    //     comercio.email = faker.internet.email();
    //     comercio.created_at = faker.date.recent();
    //     comercio.updated_at = faker.date.recent();
    //     comercio.activo = faker.random.boolean();
    //     comercio.telefono = faker.phone.phoneNumber();
    //     comercio.save()
    //         .then(u => {
    //             res.send(u);
    //         })
    //         .catch(err => {
    //             res.send(err);
    //         });
    // }

    // Está sin uso...
    public async getComerciosByIDCategoria(req: Request, res: Response) {
        let id: number = parseInt(req.params.id);
        await Comercios.find({
            where: { catComId: id },
            relations: ['catComId'],
        })
            .then((comercios) => {
                res.send({ comercios });
            })
            .catch((err) => res.json(err.message));
    }

    public async getComerciosByIdUsuario(req: Request, res: Response) {
        let id: number = parseInt(req.params.id);
        await Comercios.getComerciosByUsuario(id)
            .then((comercios) => {
                res.send({ comercios });
            })
            .catch((err) => res.json(err.message));
    }

    // ================================================================
    public async getComerciosHabilitados(req: Request, res: Response) {
        await Comercios.find({
            where: { activo: true },
            relations: ['catComId', 'marcas', 'usuarios'],
        })
            .then(async (comercios) => {
                // for (let i of comercios) {
                //   delete i.usuarios[0].password;
                //   delete i.access_token;
                //   delete i.auth_code;
                //   delete i.refresh_token;
                //   delete i.last_update_token;
                // }
                return comercios;
            })
            .then((resp) => {
                res.json(resp);
            })
            .catch((err) => {
                res.send(err);
            });
    }

    public async getComerciosDeshabilitados(req: Request, res: Response) {
        await Comercios.find({
            where: { activo: false },
            relations: ['catComId', 'marcas', 'usuarios'],
        })
            .then(async (comercios: Comercios[]) => {
                for (let i of comercios) {
                    delete i.usuarios[0].password;
                    delete i.access_token;
                    delete i.auth_code;
                    delete i.refresh_token;
                    delete i.last_update_token;
                }
                return comercios;
            })
            .then((resp) => {
                res.json(resp);
            })
            .catch((err) => {
                res.send(err);
            });
    }

    public async deshabilitar(req: Request, res: Response) {
        let id = parseInt(req.params.id);
        await Comercios.findOne({ id })
            .then((comercio: Comercios) => {
                comercio.activo = false;
                comercio
                    .save()
                    .then((u) => {
                        res.json(u);
                    })
                    .catch((err) => {
                        res.json(err);
                    });
            })
            .catch((err) => res.json(err.message));
    }

    public async habilitar(req: Request, res: Response) {
        let id = parseInt(req.params.id);
        await Comercios.findOne({ id })
            .then((comercio: Comercios) => {
                comercio.activo = true;
                comercio
                    .save()
                    .then((u) => {
                        res.json(u);
                    })
                    .catch((err) => {
                        res.json(err);
                    });
            })
            .catch((err) => res.json(err.message));
    }

    // ================================================================
    public async createComercio(req: Request, res: Response) {
        let comercio: Comercios = new Comercios();
        let email = req.body.email;
        let nombre = req.body.nombre;
        let telefono = req.body.telefono;
        let fc_alta = new Date();

        // comercio.last_update_token = req.body.
        // comercio.auth_code req.body.
        // comercio.refresh_token = comercio

        comercio.productos = comercio.productos;
        comercio.banner = req.body.banner;
        comercio.domicilio = req.body.domicilio;
        comercio.plan = req.body.plan;
        comercio.updated_at = fc_alta;
        comercio.usuarios = req.body.usuario;
        comercio.avatar = req.body.avatar;
        comercio.cuit = req.body.cuit;
        comercio.catComId = req.body.catComId;
        comercio.usuarios = req.body.usuarios;
        comercio.descripcion = req.body.descripcion;
        comercio.email = email;
        comercio.telefono = telefono;
        comercio.nombre = nombre;
        comercio.created_at = fc_alta;

        await new Promise<void>((resolve, reject) => {
            Comercios.findOne({ email })
                .then((u) => {
                    if (u) {
                        res.json('El email ya se encuentra registrado.');
                    } else {
                        resolve();
                    }
                })
                .catch((err) => {
                    res.json(err.message);
                    reject();
                });
        });

        await new Promise<void>((resolve, reject) => {
            Comercios.findOne({ telefono })
                .then((u) => {
                    if (u) {
                        res.json(
                            'El número de teléfono ya se encuentra registrado.',
                        );
                    } else {
                        resolve();
                    }
                })
                .catch((err) => {
                    res.json(err.message);
                    reject();
                });
        });

        comercio
            .save()
            .then((u) => {
                res.json(u);
            })
            .catch((err) => {
                res.json(err);
            });
    }

    public async updateComercio(req: Request, res: Response) {
        let id = parseInt(req.params.id);
        console.log('Id comercio', id);

        let email = req.body.email;
        let telefono = req.body.telefono;
        let fecha = new Date();

        Comercios.findOne({ id })
            .then(async (com: Comercios) => {
                com.nombre = req.body.nombre;
                com.domicilio = req.body.domicilio;
                com.cuit = req.body.cuit;
                com.plan = req.body.plan;
                com.avatar = req.body.avatar;
                com.activo = req.body.activo;
                com.usuarios = req.body.usuarios;
                com.descripcion = req.body.descripcion;
                com.updated_at = fecha;
                com.catComId = req.body.catComId;
                com.productos = req.body.productos;
                com.mp_acuerdo_vendedor = req.body.mp_acuerdo_vendedor;
                com.mp_mercadopago = req.body.mp_mercadopago;
                com.mp_mercadopago_qr = req.body.mp_mercadopago_qr;
                com.mp_trans_banc = req.body.mp_trans_banc;
                com.mp_abono_contra = req.body.mp_abono_contra;
                com.mp_pago_posnet = req.body.mp_pago_posnet;
                com.mp_pago_sucursal = req.body.mp_pago_sucursal;
                com.e_delivery = req.body.e_delivery;
                com.e_acuerdo_vendedor = req.body.e_acuerdo_vendedor;
                com.e_retiro_sucursal = req.body.e_retiro_sucursal;
                com.access_token = req.body.access_token;
                com.auth_code = req.body.auth_code;
                com.last_update_token = req.body.last_update_token;
                com.refresh_token = req.body.refresh_token;

                if (com.email !== email) {
                    await new Promise<void>((resolve, reject) => {
                        Comercios.findOne({ email })
                            .then((u) => {
                                if (u) {
                                    res.json(
                                        'El email ya se encuentra registrado.',
                                    );
                                } else {
                                    com.email = email;
                                    resolve();
                                }
                            })
                            .catch((err) => {
                                res.json(err.message);
                                reject();
                            });
                    });
                }

                if (com.telefono !== telefono) {
                    await new Promise<void>((resolve, reject) => {
                        Comercios.findOne({ telefono })
                            .then((u) => {
                                if (u) {
                                    res.json(
                                        'El número de teléfono ya se encuentra registrado.',
                                    );
                                } else {
                                    com.telefono = telefono;
                                    resolve();
                                }
                            })
                            .catch((err) => {
                                res.json(err.message);
                                reject();
                            });
                    });
                }

                await new Promise((resolve, reject) => {
                    com.save()
                        .then((u) => {
                            res.json(u);
                        })
                        .catch((err) => {
                            res.json(err);
                            reject();
                        });
                });
            })
            .catch((err) => res.send(err));
    }

    public deleteComercio(req: Request, res: Response) {
        let id = parseInt(req.params.id);
        Comercios.findOne({ id })
            .then((comercio) => {
                comercio
                    .remove()
                    .then((u) => {
                        res.json(u);
                    })
                    .catch((err) => {
                        res.send(err);
                    });
            })
            .catch((err) => res.send(err));
    }

    public async getComerciosPagina(req: Request, res: Response) {
        let pageNro: any = req.query.pageNro;
        let pageSize: any = req.query.pageSize;
        let filter: any = req.query.filter || '';
        let attr: any = req.query.attr || 'nombre'; // columna por la cual filtrar

        if (filter === '') {
            let comercios = await Comercios.findPaginated(pageNro, pageSize);
            for (let i of comercios) {
                // delete i.usuarios[0].password;
                delete i.access_token;
                delete i.auth_code;
                delete i.refresh_token;
                delete i.last_update_token;
            }
            res.json({ comercios });
        } else {
            let comercios = await Comercios.findByTxtPaginated(
                pageNro,
                pageSize,
                attr,
                filter,
            );
            for (let i of comercios) {
                delete i.usuarios[0].password;
                delete i.access_token;
                delete i.auth_code;
                delete i.refresh_token;
                delete i.last_update_token;
            }
            res.send({ comercios });
        }
    }

    public async getComercios(req: Request, res: Response) {
        await Comercios.find({
            order: {
                nombre: 'ASC',
            },
            relations: ['catComId', 'marcas', 'usuarios'],
        })
            .then(async (comercios: Comercios[]) => {
                for (let i of comercios) {
                    delete i.usuarios[0].password;
                    delete i.access_token;
                    delete i.auth_code;
                    delete i.refresh_token;
                    delete i.last_update_token;
                }
                return comercios;
            })
            .then((resp) => {
                res.json(resp);
            })
            .catch((err) => {
                res.send(err);
            });
    }

    public async getComercio(req: Request, res: Response) {
        let id = parseInt(req.params.id);
        await Comercios.findOne(
            { id },
            {
                relations: ['catComId', 'marcas', 'usuarios'],
            },
        )
            .then((resp) => {
                delete resp.usuarios;
                return res.json(resp);
            })
            .catch((err) => {
                res.send(err);
            });
    }

    public async getCorreos(req: Request, res: Response) {
        await Comercios.find({
            order: { nombre: 'ASC' },
            relations: ['usuarios'],
        })
            .then((comercios: Comercios[]) => {
                let resp: any[] = [];

                comercios.forEach((com) => {
                    let obj: any = {
                        comercio: com.nombre,
                        email_comercio: com.email,
                        email_usuarios: [],
                    };
                    obj.email_usuarios = com.usuarios.map((u) => {
                        return { email: u.email };
                    });
                    resp.push(obj);
                });
                return resp;
            })
            .then((resp) => res.json(resp))
            .catch((err) => {
                res.json(err.message);
            });
    }
}
