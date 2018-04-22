import * as mysql from "mysql";
import { Connection, ConnectionConfig } from "mysql";

export const createMysqlConnection = (config: ConnectionConfig): Connection => {
  const con = mysql.createConnection(config);
  con.connect(err => {
    if (err) {
      console.log("Cannot connect to MYSQL server");
      console.log("Config:", config);
      console.log("Error: " + err.stack);
      process.exit(5);
    }
    console.log("Connected to Mysql.");
  });
  return con;
};
