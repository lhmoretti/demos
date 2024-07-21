import * as dotenv from 'dotenv';
import { Config } from './config/config';
const config: Config = new Config();
// DotEnv: carga variables de entorno de un archivo .env en process.env.
const result = dotenv.config();
console.log('DotEnv:', result);
if (result.error) {
    throw result.error;
}
import mysqlUtil from './database/mysql.util';
import mongoUtil from './database/mongo.util';
import compression from 'compression';
import helmet from 'helmet';
import express from 'express';
import cors from 'cors';
import * as bodyParser from 'body-parser';
import * as http from 'http';
import { ConfigAllRoutes } from './routes';
import './crons/backupDatabase.cron';

class App {
    private logger = require('morgan');
    public app: express.Application;
    public server: http.Server;
    private allRoutes: ConfigAllRoutes = new ConfigAllRoutes();

    constructor() {
        console.log('Iniciando Servidor');
        this.app = express();
        this.init();
    }

    private async init() {
        await this.connectMySql();
        if (process.env.CONNECT_MONGO === 'true') {
            await this.connectMongo();
        }

        this.config();
        this.allRoutes.routes(this.app);
    }

    private async connectMySql(): Promise<void> {
        await mysqlUtil.connectDb();
    }

    private async connectMongo(): Promise<void> {
        await mongoUtil.connectDb();
    }

    private async config(): Promise<void> {
        this.app.use(this.logger('dev'));
        this.app.use(bodyParser.json({ type: 'application/json' }));
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(cors());
        this.app.use('/static', express.static(__dirname + '/public'));
        this.app.use(compression());
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

        this.app.listen(config.port, () =>
            console.log(`App escuchando en puerto: ${config.port}`),
        );
    }
}

export default new App().app;
