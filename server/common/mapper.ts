import {Pool, PoolConnection} from "promise-mysql";
import { createMysqlConnectionPool } from "../services/mysql.connection";
import config from "../config";
import * as Bluebird from 'bluebird';

export class AbstractMapper {
    protected pool: Pool;
    constructor() {
        this.pool = createMysqlConnectionPool(config.mysql.config);
        this.getCon = this.getCon.bind(this);
    }

    public getCon(): Bluebird<PoolConnection> {
        return this.pool.getConnection();
    }
}
