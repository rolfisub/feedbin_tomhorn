import { LiveOddsMsgBody } from "./types";
import { MysqlError, Pool } from "mysql";

export default class LiveMapper {
    protected pool: Pool;

    constructor(pool: Pool) {
        this.pool = pool;
    }

    public saveMsg(body: LiveOddsMsgBody) {
        console.log(body);
    }

    protected handleSqlError(error: MysqlError) {
        console.log(error);
    }
}
