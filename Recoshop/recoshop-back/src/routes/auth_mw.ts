import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { Usuarios } from '../Entities/Usuarios';
import { UsuariosController } from '../controllers/usuarios.controller';

export const ctlUsuario: UsuariosController = new UsuariosController();

export function jwtAdminMidleware(req: Request, res: Response, next) {
    const authString = req.headers['authorization'];

    if (typeof authString === 'string' && authString.indexOf(' ') > -1) {
        const authArray = authString.split(' ');
        const token = authArray[1];
        jwt.verify(token, process.env.PKEY, async (err, decoded: any) => {
            if (err) {
                res.status(403).send({
                    ok: false,
                    msg: 'Token no válido: No tiene autorización para este recurso',
                    error: err,
                });
            } else {
                // comprobamos que el usuario sea realmente el que esta haciendo la peticion
                // y que no se haya modificado el rol
                // let user: Usuarios;
                // await Usuarios.findById(decoded.id)
                //   .then(u => user = u)
                //   .catch(err => { return res.json({ err }) });
                if (decoded.role == 1) {
                    // 1 = rol ADMIN
                    next();
                } else {
                    res.status(403).send({
                        ok: false,
                        msg: 'Token no válido: No tiene autorización para este recurso',
                        error: err,
                    });
                }
            }
        });
    } else {
        res.status(403).send({
            ok: false,
            msg: 'Token no válido: No tiene autorización para este recurso',
        });
    }
}

export function jwtComercianteMidleware(req: Request, res: Response, next) {
    const authString = req.headers['authorization'];

    if (typeof authString === 'string' && authString.indexOf(' ') > -1) {
        const authArray = authString.split(' ');
        const token = authArray[1];
        jwt.verify(token, process.env.PKEY, async (err, decoded: any) => {
            if (err) {
                res.status(403).send({
                    ok: false,
                    msg: 'Token no válido: No tiene autorización para este recurso',
                    error: err,
                });
            } else {
                if (decoded.role <= 2) {
                    // 1 = rol VENDEDOR
                    next();
                } else {
                    res.status(403).send({
                        ok: false,
                        msg: 'Token no válido: No tiene autorización para este recurso',
                        error: err,
                    });
                }
            }
        });
    } else {
        res.status(403).send({
            ok: false,
            msg: 'Token no válido: No tiene autorización para este recurso',
        });
    }
}

export function jwtClienteMidleware(req: Request, res: Response, next) {
    const authString = req.headers['authorization'];

    if (typeof authString === 'string' && authString.indexOf(' ') > -1) {
        const authArray = authString.split(' ');
        const token = authArray[1];
        jwt.verify(token, process.env.PKEY, async (err, decoded: any) => {
            if (err) {
                res.status(403).send({
                    ok: false,
                    msg: 'Token no válido: No tiene autorización para este recurso',
                    error: err,
                });
            } else {
                if (decoded.role == 3) {
                    // 3 = rol CLIENTE
                    next();
                } else {
                    res.status(403).send({
                        ok: false,
                        msg: 'Token no válido: No tiene autorización para este recurso',
                        error: err,
                    });
                }
            }
        });
    } else {
        res.status(403).send({
            ok: false,
            msg: 'Token no válido: No tiene autorización para este recurso',
        });
    }
}
