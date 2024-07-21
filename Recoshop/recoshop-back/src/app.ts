import * as dotenv from 'dotenv';
import { Config } from './config/config';
const config: Config = new Config();
// DotEnv: carga variables de entorno de un archivo .env en process.env.
const result = dotenv.config();
console.log('DotEnv:', result);
if (result.error) {
    throw result.error;
}

import { createConnection, Connection } from 'typeorm';
import compression from 'compression';
import helmet from 'helmet';
import express from 'express';
import cors from 'cors';
import * as bodyParser from 'body-parser';
import * as path from 'path';
import * as http from 'http';

// Routes
import { UsuariosRouter } from './routes/usuarios.routes';
import { ComerciosRouter } from './routes/comercios.routes';
import { LoginRoutes } from './routes/login.routes';
import { MarcasRouter } from './routes/marcas.routes';
import { HorariosRouter } from './routes/horarios.routes';
import { OpinionesRouter } from './routes/opiniones.routes';
import { DiasRouter } from './routes/dias.routes';
import { ProductosRouter } from './routes/productos.routes';
import { PedidosRouter } from './routes/pedidos.routes';
import { PedidosLineaRouter } from './routes/pedidos_lineas.routes';
import { CategoriasRouter } from './routes/categorias.routes';
import { ImagenesRouter } from './routes/imagenes.routes';
import { FilesUploadProductosRouter } from './routes/file_upload-productos.routes';
import { FilesUploadCsvRouter } from './routes/file_upload-csv.routes';
import { FilesUploadBannAvatRouter } from './routes/file_upload-banner-avatar.routes';
import { CategoriasComerciosRouter } from './routes/categorias_comercios.routes';
import { MailTransactionRoute } from './routes/transactional.mail.routes';
import { BannersRouter } from './routes/banners.routes';
import { SuscripcionsRouter } from './routes/suscripciones.routes';
import { MercadoPagoRoutes } from './routes/mercado_pago.routes';
import { MockRouter } from './mock/mock.routes';

class App {
    private logger = require('morgan'); // Registro de cada petición
    public app: express.Application;
    public conection: Connection;
    public server: http.Server;

    public routeComercios: ComerciosRouter = new ComerciosRouter();
    public routeUsuarios: UsuariosRouter = new UsuariosRouter();
    public routeLogin: LoginRoutes = new LoginRoutes();
    public routeMarcas: MarcasRouter = new MarcasRouter();
    public routeHorarios: HorariosRouter = new HorariosRouter();
    public routeOpiniones: OpinionesRouter = new OpinionesRouter();
    public routeDias: DiasRouter = new DiasRouter();
    public routeArticulos: ProductosRouter = new ProductosRouter();
    public routePedidos: PedidosRouter = new PedidosRouter();
    public routePedidosLineas: PedidosLineaRouter = new PedidosLineaRouter();
    public routeCategorias: CategoriasRouter = new CategoriasRouter();
    public routeImagenes: ImagenesRouter = new ImagenesRouter();
    public routeCategoriasComercios: CategoriasComerciosRouter =
        new CategoriasComerciosRouter();
    public routeMailTransaction: MailTransactionRoute =
        new MailTransactionRoute();
    public routeBanner: BannersRouter = new BannersRouter();
    public routeSuscripciones: SuscripcionsRouter = new SuscripcionsRouter();
    public routeMercadoPago: MercadoPagoRoutes = new MercadoPagoRoutes();
    public routeFUProductos: FilesUploadProductosRouter =
        new FilesUploadProductosRouter();
    public routeFUCsv: FilesUploadCsvRouter = new FilesUploadCsvRouter();
    public routeFUBannAvat: FilesUploadBannAvatRouter =
        new FilesUploadBannAvatRouter();
    public routeMock: MockRouter = new MockRouter();

    constructor() {
        console.log('Iniciando Servidor');
        this.app = express();

        createConnection()
            .then(async (connection) => {
                this.conection = connection;
                console.log('Base de datos Ecommerce:', connection.isConnected);
            })
            .catch((error) => console.log(error));

        this.config();

        //Definimos todas las rutas
        this.routeUsuarios.routes(this.app);
        this.routeComercios.routes(this.app);
        this.routeLogin.routes(this.app);
        this.routeMarcas.routes(this.app);
        this.routeHorarios.routes(this.app);
        this.routeOpiniones.routes(this.app);
        this.routeDias.routes(this.app);
        this.routeArticulos.routes(this.app);
        this.routePedidos.routes(this.app);
        this.routePedidosLineas.routes(this.app);
        this.routeCategorias.routes(this.app);
        this.routeImagenes.routes(this.app);
        this.routeFUBannAvat.routes(this.app);
        this.routeFUCsv.routes(this.app);
        this.routeFUProductos.routes(this.app);
        this.routeCategoriasComercios.routes(this.app);
        this.routeMailTransaction.routes(this.app);
        this.routeBanner.routes(this.app);
        this.routeSuscripciones.routes(this.app);
        this.routeMercadoPago.routes(this.app);

        if (process.env.NODE_ENV === 'DEV') {
            this.routeMock.routes(this.app);
        }
    }

    private config(): void {
        this.app.use(this.logger('dev'));

        // bodyParser: Analiza los cuerpos de solicitud entrantes en un middleware antes de sus
        // manejadores, disponibles bajo la propiedad req.body.
        this.app.use(bodyParser.json({ type: 'application/json' }));
        this.app.use(bodyParser.urlencoded({ extended: false }));

        // Habilitar cors:
        this.app.use(cors());

        // Habilitar carpeta public:
        this.app.use('/static', express.static(__dirname + '/public'));

        // Este middleware intentará comprimir los cuerpos de respuesta para todas las solicitudes que lo atraviesen:
        this.app.use(compression());
        // ayuda a proteger aplicaciones Express configurando varios encabezados HTTP:
        this.app.use(helmet());

        this.app.use(function (req, res, next) {
            res.header('Access-Control-Allow-Origin', '*');
            res.header(
                'Access-Control-Allow-Headers',
                'Origin, X-Requested-With, Content-Type, Accept, Authorization',
            );
            res.header(
                'Access-Control-Allow-Methods',
                'GET, POST, PUT, DELETE, PATCH, OPTIONS',
            );
            next();
        });

        this.app.listen(config.port(), () =>
            console.log(`App escuchando en puerto: ${config.port()}`),
        );
    }
}
export default new App().app;
