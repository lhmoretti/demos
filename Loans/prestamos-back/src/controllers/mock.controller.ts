import { Request, Response } from 'express';
import { getConnection } from 'typeorm';
import { modules } from '../database/mock/modules';
import { roles } from '../database/mock/roles';
import { users } from '../database/mock/users';
import { Modulos } from '../entities/modulos.entity.sql';
import { Roles } from '../entities/roles.entity.sql';
import { Usuarios } from '../entities/usuarios.entity.sql';
import { mysqlDb } from '../data.source.mysql';
import { ApiResponse } from '../api/response';

export class MockController {
    constructor() {}

    public async mock(req: Request, res: Response) {
        try {
            console.log('Ejecutando Mock \n ================ ');

            for (let i = 0; i < modules.length; i++) {
                await mysqlDb
                    .getRepository(Modulos)
                    .createQueryBuilder('modulos')
                    .insert()
                    .into(Modulos)
                    .values(modules[i])
                    .orUpdate(['id'], ['modulo', 'activo'])
                    .execute();
            }
            console.log('Termina Modulos \n ================ ');

            for (let i = 0; i < roles.length; i++) {
                await mysqlDb
                    .getRepository(Roles)
                    .createQueryBuilder('roles')
                    .insert()
                    .into(Roles)
                    .values(roles[i])
                    .orUpdate(['id'], ['role', 'descripcion', 'nivel'])
                    .execute();
            }
            console.log('Termina Roles \n ================ ');

            for (let i = 0; i < users.length; i++) {
                await mysqlDb.manager.save(Usuarios, users[i] as Object);
            }
            console.log('Termina Usuarios \n ================ ');
            ApiResponse({ res, data: 'Termina Mock' });
        } catch (error) {
            ApiResponse({ res, error });
        }
    }
}
