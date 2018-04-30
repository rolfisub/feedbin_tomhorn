import * as mysql from "promise-mysql";
import { ConnectionConfig, Pool } from "promise-mysql";

export const createMysqlConnectionPool = (config: ConnectionConfig): Pool => {
    const pool = mysql.createPool(config);
    //test the connection
    pool.getConnection().then((con)=> {
        console.log("Connected to Mysql.");
        con.release();
    }).catch((err)=>{
        if (err) {
            console.log("Cannot connect to MYSQL server");
            console.log("Config:", config);
            console.log("Error: " + err.stack);
            process.exit(5);
        }
    });

    return pool;
};
