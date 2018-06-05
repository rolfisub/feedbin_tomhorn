import { PoolConfig } from "mysql";
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
    general: {
        logLiveMsgToDB: boolean;
        myTimeZone: string;
    };
}

const config: ConfigInterface = {
    version: configFile.version,
    mysql: {
        config: {
            ...configFile.mysql.config
        }
    },
    general: {
        ...configFile.general
    }
};

export default config;
