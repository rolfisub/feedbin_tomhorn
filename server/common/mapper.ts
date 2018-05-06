import { Pool, PoolConnection } from "promise-mysql";
import { createMysqlConnectionPool } from "../services/mysql.connection";
import config from "../config";
import * as Bluebird from "bluebird";
import { MysqlError } from "mysql";
import {Logger} from "ts-log-debug";

const logger = new Logger('mysqlErrors');
logger.appenders.set("everything",{
    type: "file",
    filename: "mysqlErrors.log"
});

export class AbstractMapper {
    protected pool: Pool;
    constructor() {
        this.pool = createMysqlConnectionPool(config.mysql.config);
        this.getCon = this.getCon.bind(this);
    }

    public async getCon(): Bluebird<PoolConnection> {
        let con: PoolConnection;
        try {
            con = await this.pool.getConnection();
        } catch (e) {
            this.handleMysqlError(e, con);
        }
        return con;
    }

    public handleMysqlError(err: MysqlError, obj: any = {}): void {
        console.log(err);
        console.log(obj);
        logger.error(err, obj);
        return;
    }
}
