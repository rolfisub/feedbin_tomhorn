import * as mysql from "mysql";
import { ConnectionConfig, Pool } from "mysql";

export const createMysqlConnectionPool = (config: ConnectionConfig): Pool => {
    const pool = mysql.createPool(config);
    //test the connection
    pool.getConnection(err => {
        if (err) {
            console.log("Cannot connect to MYSQL server");
            console.log("Config:", config);
            console.log("Error: " + err.stack);
            process.exit(5);
        }
        console.log("Connected to Mysql.");
    });
    return pool;
};
