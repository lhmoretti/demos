import { Usuarios } from '../entities/usuarios.entity.sql';
import { Request, Response } from 'express';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

export class UsuariosAuthController {
    constructor() {}

    public async loginUsuario(req: Request, res: Response) {
        console.log('Login', req.body);

        const password = req.body.password;
        const username = req.body.username;

        let usuario: Usuarios = new Usuarios();
        usuario = await Usuarios.findByUsername(username);
        console.log('Usuario buscado por username.', usuario);

        if (!usuario) {
            // Si no encuentra el usuario
            return res.status(404).send({
                isLogged: false,
                token: null,
                error: 'Datos incorrectos.',
            });
        }

        const validarPasword = await bcrypt.compareSync(
            password,
            usuario.password,
        );

        if (!validarPasword) {
            // return res.status(401).send({ Error: "La contraseña no coincide."});
            return res.status(401).send({
                isLogged: false,
                token: null,
                error: 'Password incorrecta.',
            });
        }

        const userSinPass = { ...usuario };
        delete userSinPass.password;

        const token = jwt.sign(userSinPass, process.env.PRIVATE_KEY, {
            expiresIn: '10h',
        });

        res.status(200).send({
            isLogged: true,
            token: token,
            expiresIn: '10h',
            roles: userSinPass.roles,
        });
    }
}
