import {LiveOddsMsgBody} from "./types";
import {ConnectionConfig, MysqlError} from "mysql";

export default class LiveMapper {

    constructor(mysqlConfig: ConnectionConfig) {
        console.log("Mysql Config received: ", mysqlConfig);
    }

    public saveMsg(body: LiveOddsMsgBody) {
        console.log(body);
    }

    protected handleSqlError(error: MysqlError) {
        console.log(error);
    }
}