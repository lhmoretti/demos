import * as dotenv from 'dotenv';
const result = dotenv.config();
if (result.error) {
    throw result.error;
}
import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';

const env: NodeJS.ProcessEnv = process.env;

export const mysqlDb = new DataSource(<MysqlConnectionOptions>{
    type: 'mysql',
    host: env.SQL_HOST,
    port: parseInt(env.SQL_PORT),
    username: env.SQL_USERNAME,
    password: env.SQL_PASSWORD,
    database: env.SQL_DATABASE,
    logging: false,
    synchronize: false,
    entities: [__dirname + '/entities/*.entity.sql{.ts,.js}'],
    migrationsTableName: 'app_migration_table',
    migrations: [__dirname + '/database/migrations/*{.ts,.js}'],
});
