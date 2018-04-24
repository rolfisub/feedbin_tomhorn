import { Connection, MysqlError, Pool } from "mysql";
import { createMysqlConnectionPool } from "../services/mysql.connection";
import config from "../config";

export class AbstractMapper {
    protected pool: Pool;
    constructor() {
        this.pool = createMysqlConnectionPool(config.mysql.config);
        this.getCon = this.getCon.bind(this);
    }

    public getCon(callback: (err: MysqlError, con: Connection) => void): void {
        return this.pool.getConnection(callback);
    }
}
