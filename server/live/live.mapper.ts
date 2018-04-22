import {LiveOddsMsgBody} from "./types";
import {Connection, ConnectionConfig, MysqlError} from "mysql";
import {createMysqlConnection} from "../services/mysql.connection";

export default class LiveMapper {
    protected con: Connection;

    constructor(mysqlConfig: ConnectionConfig) {
        this.con = createMysqlConnection(mysqlConfig);
    }

    public saveMsg(body: LiveOddsMsgBody) {
        console.log(body);
    }

    protected handleSqlError(error: MysqlError) {
        console.log(error);
    }
}
