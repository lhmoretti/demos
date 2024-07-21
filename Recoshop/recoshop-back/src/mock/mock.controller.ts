import { Request, Response } from 'express';
import { getConnection } from 'typeorm';
import { Marcas } from '../Entities/Marcas';
import { marcas } from './constants/marcas';
import { categorias } from './constants/categorias';
import { Categorias } from '../Entities/Categorias';
import { comercios } from './constants/comercios';
import { Comercios } from '../Entities/Comercios';
import { categoriasComercios } from './constants/categorias-comercios';
import { CategoriasComercios } from '../Entities/CategoriasComercios';
import { productos } from './constants/productos';
import { Productos } from '../Entities/Productos';
import { Usuarios } from '../Entities/Usuarios';
import { usuarios } from './constants/usuarios';
import { imagenes } from './constants/imagenes';
import { Imagenes } from '../Entities/Imagenes';
import * as bcrypt from 'bcrypt';

export class MockController {
    constructor() {}

    public async mock(req: Request, res: Response) {
        for (let i = 0; i < usuarios.length; i++) {
            // await getConnection()
            //   .createQueryBuilder()
            //   .insert()
            //   .into(Usuarios)
            //   .values(usuarios[i])
            //   .orUpdate({
            //     conflict_target: ["id"],
            //     overwrite: ["username", "email", "nombre", "apellido", "password"],
            //   })
            //   .execute();

            await Usuarios.create({
                ...usuarios[i],
                password: bcrypt.hashSync(usuarios[i].password, 10),
            } as Usuarios).save();
        }

        for (let i = 0; i < categoriasComercios.length; i++) {
            await getConnection()
                .createQueryBuilder()
                .insert()
                .into(CategoriasComercios)
                .values(categoriasComercios[i])
                .orUpdate({
                    conflict_target: ['id'],
                    overwrite: ['categoria'],
                })
                .execute();
        }

        for (let i = 0; i < comercios.length; i++) {
            // await getConnection()
            //   .createQueryBuilder()
            //   .insert()
            //   .into(Comercios)
            //   .values(comercios[i])
            //   .orUpdate({
            //     conflict_target: ["id"],
            //     overwrite: ["nombre", "descripcion", "avatar", "banner"],
            //   })
            //   .execute();

            await Comercios.create({
                ...comercios[i],
            } as Comercios).save();
        }

        for (let i = 0; i < marcas.length; i++) {
            await getConnection()
                .createQueryBuilder()
                .insert()
                .into(Marcas)
                .values(marcas[i])
                .orUpdate({
                    conflict_target: ['id'],
                    overwrite: ['marca'],
                })
                .execute();
        }

        for (let i = 0; i < categorias.length; i++) {
            await getConnection()
                .createQueryBuilder()
                .insert()
                .into(Categorias)
                .values(categorias[i])
                .orUpdate({
                    conflict_target: ['id'],
                    overwrite: ['categoria', 'url_img', 'activo'],
                })
                .execute();
        }

        for (let i = 0; i < productos.length; i++) {
            await getConnection()
                .createQueryBuilder()
                .insert()
                .into(Productos)
                .values(productos[i])
                .orUpdate({
                    conflict_target: ['id'],
                    overwrite: [
                        'nombre',
                        'descripcion',
                        'precio_costo',
                        'precio_venta',
                        'precio_oferta',
                    ],
                })
                .execute();
        }

        for (let i = 0; i < imagenes.length; i++) {
            await getConnection()
                .createQueryBuilder()
                .insert()
                .into(Imagenes)
                .values(imagenes[i])
                .orUpdate({
                    conflict_target: ['id'],
                    overwrite: ['img_thumb', 'url', 'productoId'],
                })
                .execute();
        }

        res.json({
            ok: true,
        });
    }
}
