import express from 'express';
import { EstadisticasRouter } from './estadisticas.routes';
import { LoginRoutes } from './login.routes';
import { LogsRouter } from './logs.routes';
import { MockRouter } from './mock.routes';
import { ModulosRouter } from './modulos.routes';
import { PagosRouter } from './pagos.routes';
import { PrestamosRouter } from './prestamos.routes';
import { RolesRouter } from './roles.routes';
import { UsuariosRouter } from './usuarios.routes';

export class ConfigAllRoutes {
    public usuarios: UsuariosRouter = new UsuariosRouter();
    public modulos: ModulosRouter = new ModulosRouter();
    public roles: RolesRouter = new RolesRouter();
    public prestamos: PrestamosRouter = new PrestamosRouter();
    public pagos: PagosRouter = new PagosRouter();
    public login: LoginRoutes = new LoginRoutes();
    public estadisticas: EstadisticasRouter = new EstadisticasRouter();
    public logs: LogsRouter = new LogsRouter();
    public mock: MockRouter = new MockRouter();
    router: express.Router = express.Router();
    apiPrefix: string = '/api/v1';

    public routes(app: express.Application) {
        app.use(this.apiPrefix, this.logs.routes(this.router));
        app.use(this.apiPrefix, this.modulos.routes(this.router));
        app.use(this.apiPrefix, this.usuarios.routes(this.router));
        app.use(this.apiPrefix, this.roles.routes(this.router));
        app.use(this.apiPrefix, this.prestamos.routes(this.router));
        app.use(this.apiPrefix, this.pagos.routes(this.router));
        app.use(this.apiPrefix, this.login.routes(this.router));
        app.use(this.apiPrefix, this.estadisticas.routes(this.router));
        app.use(this.apiPrefix, this.mock.routes(this.router));
    }
}
