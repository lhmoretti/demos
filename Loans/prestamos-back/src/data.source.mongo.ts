import * as dotenv from 'dotenv';
const result = dotenv.config();
if (result.error) {
    throw result.error;
}
import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { MongoConnectionOptions } from 'typeorm/driver/mongodb/MongoConnectionOptions';

const env: NodeJS.ProcessEnv = process.env;

export const mongoDb = new DataSource(<MongoConnectionOptions>{
    type: 'mongodb',
    host: env.MONGO_HOST,
    port: parseInt(env.MONGO_PORT),
    database: env.MONGO_DATABASE,
    entities: [__dirname + '/entities/*.entity.mongo{.ts,.js}'],
    // username: env.MONGO_USERNAME,
    // password: env.MONGO_PASSWORD
});
