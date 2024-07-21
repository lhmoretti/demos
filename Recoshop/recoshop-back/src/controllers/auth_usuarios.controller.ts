import { Usuarios } from '../Entities/Usuarios';
import { Request, Response } from 'express';
import nodemailer from 'nodemailer';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

export class UsuariosAuthController {
    constructor() {}

    public async loginUsuario(req: Request, res: Response) {
        let email = req.body.email;
        let password = req.body.password;
        let username = req.body.username;
        let telefono = req.body.telefono;
        let usuario: Usuarios;

        if (email) {
            usuario = await Usuarios.findByEmail(email);
            console.log('Usuario buscado por email.');
        }

        if (telefono) {
            usuario = await Usuarios.findByTelefono(telefono);
            console.log('Usuario buscado por teléfono.');
        }

        if (username) {
            usuario = await Usuarios.findByUsername(username);
            console.log('Usuario buscado por username.');
        }

        if (!usuario) {
            // Si no encuentra el usuario
            return res.status(404).send({
                isLogged: false,
                token: null,
                error: 'Datos incorrectos.',
            });
        }

        let validarPasword = bcrypt.compareSync(password, usuario.password);

        if (!validarPasword) {
            // return res.status(401).send({ Error: "La contraseña no coincide."});
            return res.status(401).send({
                isLogged: false,
                token: null,
                error: 'Datos incorrectos.',
            });
        }

        const userSinPass = { ...usuario };
        delete userSinPass.password;

        let token = jwt.sign(userSinPass, process.env.PKEY, {
            expiresIn: '3h',
        });

        res.status(200).send({
            isLogged: true,
            token: token,
            expiresIn: '3h',
            role: userSinPass.role,
            activo: userSinPass.activo,
            // user: userSinPass
        });
    }
}
