import {PoolConfig} from "mysql";
import * as fs from "fs";
import * as path from "path";

const configFile = JSON.parse(
    fs.readFileSync(path.resolve("./config.json")).toString()
);

interface ConfigInterface {
    version: number;
    mysql: {
        config: PoolConfig;
    };
}

const config: ConfigInterface = {
    version: 1,
    mysql: {
        config: {
            ...configFile.mysql.config,
            queueLimit: 5,
            multipleStatements: true
        }
    }
};

export default config;
