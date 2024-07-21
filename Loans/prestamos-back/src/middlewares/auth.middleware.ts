import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { ApiResponse } from '../api/response';
import { Roles } from '../entities/roles.entity.sql';
import { Usuarios } from '../entities/usuarios.entity.sql';

const checkRole = (
    decoded: Usuarios,
    requiredRoles: string[],
    next: NextFunction,
) => {
    if (
        decoded.roles.some((r: Roles) =>
            requiredRoles.some((rr) => r.role === rr),
        )
    )
        next();
};

export function isAllowed(requiredRoles: string[]) {
    return function (req: Request, res: Response, next: NextFunction) {
        return next();
        const authString = req.headers['authorization'];

        if (typeof authString === 'string' && authString.indexOf(' ') > -1) {
            const authArray = authString.split(' ');
            const token = authArray[1];
            jwt.verify(
                token,
                process.env.PRIVATE_KEY,
                async (error, decoded: any) => {
                    if (error) return ApiResponse({ res, error });

                    checkRole(decoded, requiredRoles, next);
                },
            );
        } else {
            const error = { message: 'Token no válido' };
            return ApiResponse({ res, error });
        }
    };
}
