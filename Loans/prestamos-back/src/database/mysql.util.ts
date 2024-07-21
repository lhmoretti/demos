import { DataSource } from "typeorm";
import { mysqlDb } from "../data.source.mysql"

const mysqlUtil = {
    connectDb: async (): Promise<DataSource> => {
        try {
            const db = await mysqlDb.initialize();
            console.log('Connected to MySQL')
            return db;
        } catch (error) {
            console.log('Error to connect MySQL')
        }
    }
}

export default mysqlUtil;
