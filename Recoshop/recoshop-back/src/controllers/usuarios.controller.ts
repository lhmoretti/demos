import { Usuarios } from '../Entities/Usuarios';
import { Request, Response, NextFunction } from 'express';
import * as bcrypt from 'bcrypt';
import * as faker from 'faker';

export class UsuariosController {
    constructor() {}

    public createUsuarioFaker(req: Request, res: Response) {
        let usuario = new Usuarios();
        // usuario = ;
        let randomRole = 3; // 1, 2, 3
        usuario.role = randomRole;
        usuario.nombre = faker.name.firstName();
        usuario.apellido = faker.name.lastName();
        usuario.domicilio = faker.address.streetAddress();
        usuario.email = faker.internet.email();
        usuario.username = faker.internet.userName();
        usuario.password = bcrypt.hashSync(faker.internet.password(), 8);
        usuario.created_at = faker.date.recent();
        usuario.updated_at = faker.date.recent();
        usuario.activo = faker.random.boolean();
        usuario.telefono = faker.phone.phoneNumber();

        usuario
            .save()
            .then((u) => {
                res.send(u);
            })
            .catch((err) => {
                res.send(err);
            });
    }

    public async getUsuarios(req: Request, res: Response) {
        await Usuarios.find({
            order: { nombre: 'ASC' },
            relations: ['comercios'],
        })
            .then((usuarios: Usuarios[]) => {
                usuarios.forEach((u) => delete u.password);
                res.json(usuarios);
            })
            .catch((err) => {
                res.json(err.message);
            });
    }

    public async getUsuario(req: Request, res: Response, idUser?: number) {
        let id: number;
        id = parseInt(req.params.id);

        return await Usuarios.findOne({ id })
            .then((usuario: Usuarios) => {
                delete usuario.password;
                return res.json(usuario);
            })
            .catch((err) => {
                return res.json(err.message);
            });
    }

    public async createUsuario(req: Request, res: Response) {
        let usuario: Usuarios = new Usuarios();
        let email = req.body.email;
        let username = req.body.username;
        let telefono = req.body.telefono;
        let fc_alta = new Date();
        usuario.role = 3;
        usuario.email = email;
        usuario.telefono = telefono;
        usuario.username = username || 'user_' + Date.now();
        usuario.created_at = fc_alta;
        usuario.updated_at = fc_alta;

        usuario.nombre = req.body.nombre;
        usuario.apellido = req.body.apellido;
        usuario.avatar = req.body.avatar;
        usuario.domicilio = req.body.domicilio;
        usuario.password = bcrypt.hashSync(req.body.password, 10);

        await new Promise<void>((resolve, reject) => {
            Usuarios.findOne({ email })
                .then((u) => {
                    if (u) {
                        res.json('El email ya se encuentra registrado.');
                    } else {
                        // return something
                        resolve();
                    }
                })
                .catch((err) => {
                    res.json(err.message);
                    reject();
                });
        });

        await new Promise<void>((resolve, reject) => {
            Usuarios.findOne({ username })
                .then((u) => {
                    if (u) {
                        res.json(
                            'El nombre de usuario ya se encuentra registrado.',
                        );
                    } else {
                        // return something
                        resolve();
                    }
                })
                .catch((err) => {
                    res.json(err.message);
                    reject();
                });
        });

        await new Promise<void>((resolve, reject) => {
            Usuarios.findOne({ telefono })
                .then((u) => {
                    if (u) {
                        res.json(
                            'El número de teléfono ya se encuentra registrado.',
                        );
                    } else {
                        // return something

                        resolve();
                    }
                })
                .catch((err) => {
                    res.json(err.message);
                    reject();
                });
        });

        usuario
            .save()
            .then((usuario: Usuarios) => {
                delete usuario.password;
                res.json(usuario);
            })
            .catch((err) => {
                res.json(err);
            });
    }

    public async usuarioAVendedor(req: Request, res: Response) {
        let id = parseInt(req.params.id);
        const usuario: Usuarios = await Usuarios.findOne({ id });
        usuario.role = 2;
        usuario
            .save()
            .then((user) => {
                res.json(user);
            })
            .catch((err) => res.send(err));
    }

    public async updateUsuario(req: Request, res: Response) {
        let id = parseInt(req.params.id);
        let email = req.body.email;
        let username = req.body.username;
        let telefono = req.body.telefono;
        let fecha = new Date();

        let usuario = await Usuarios.findOne({ id });
        usuario.nombre = req.body.nombre;
        usuario.apellido = req.body.apellido;
        usuario.domicilio = req.body.domicilio;
        usuario.recpass = null;
        usuario.avatar = req.body.avatar;
        usuario.activo = req.body.activo;
        usuario.comercios = req.body.comercios;
        usuario.updated_at = fecha;

        if (usuario.email !== email) {
            await new Promise<void>((resolve, reject) => {
                Usuarios.findOne({ email })
                    .then((u) => {
                        if (u) {
                            res.json('El email ya se encuentra registrado.');
                        } else {
                            usuario.email = email;
                            resolve();
                        }
                    })
                    .catch((err) => {
                        res.json(err.message);
                        reject();
                    });
            });
        }

        if (usuario.username !== username) {
            await new Promise<void>((resolve, reject) => {
                Usuarios.findOne({ username })
                    .then((u) => {
                        if (u) {
                            res.json(
                                'El nombre de usuario ya se encuentra registrado.',
                            );
                        } else {
                            usuario.username = username;
                            resolve();
                        }
                    })
                    .catch((err) => {
                        res.json(err.message);
                        reject();
                    });
            });
        }

        if (usuario.telefono !== telefono) {
            await new Promise<void>((resolve, reject) => {
                Usuarios.findOne({ telefono })
                    .then((u) => {
                        if (u) {
                            res.json(
                                'El número de teléfono ya se encuentra registrado.',
                            );
                        } else {
                            usuario.telefono = telefono;
                            resolve();
                        }
                    })
                    .catch((err) => {
                        res.json(err.message);
                        reject();
                    });
            });
        }

        usuario
            .save()
            .then((usuario: Usuarios) => {
                delete usuario.password;
                res.json(usuario);
            })
            .catch((err) => {
                res.json(err);
            });
    }

    public async updatePasswordUsuario(req: Request, res: Response) {
        let id = parseInt(req.params.id);
        let usuario = await Usuarios.findOne({ id });
        usuario.password = bcrypt.hashSync(req.body.password, 10);
        usuario
            .save()
            .then((usuario: Usuarios) => {
                delete usuario.password;
                res.json(usuario);
            })
            .catch((err) => {
                res.json({
                    err,
                });
            });
    }

    public deleteUsuario(req: Request, res: Response) {
        let id = parseInt(req.params.id);
        Usuarios.findOne({ id })
            .then((usuario) => {
                usuario
                    .remove()
                    .then((usuario: Usuarios) => {
                        delete usuario.password;
                        res.json(usuario);
                    })
                    .catch((err) => {
                        res.send(err);
                    });
            })
            .catch((err) => {
                res.json(err.message);
            });
    }

    public async findByTxtPaginated(req: Request, res: Response) {
        let pageNro: any = req.query.pageNro;
        let pageSize: any = req.query.pageSize;
        let filter: any = req.query.filter || '';
        let attr: any = req.query.attr || 'nombre'; // columna por la cual filtrar
        let usuarios = await Usuarios.findByTxtPaginated(
            pageNro,
            pageSize,
            attr,
            filter,
        );
        usuarios.forEach((u) => delete u.password);
        res.json(usuarios);
    }

    public async findByRecpass(req: Request, res: Response) {
        let recpass = req.params.recpass;
        let usuario = await Usuarios.findByRecpass(recpass);
        delete usuario.password;
        res.json({ usuario });
    }

    public async findByRolePaginated(req: Request, res: Response) {
        let pageNro: any = req.query.pageNro;
        let pageSize: any = req.query.pageSize;
        let role = req.params.id;
        let usuarios = await Usuarios.findByRolePaginated(
            pageNro,
            pageSize,
            role,
        );
        usuarios.forEach((u) => delete u.password);
        res.json(usuarios);
    }
}
