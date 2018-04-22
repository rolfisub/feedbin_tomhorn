import {ConnectionConfig} from "mysql";

interface ConfigInterface {
    version: number;
    mysql: {
        config: ConnectionConfig;
    };
}

const config: ConfigInterface = {
    version: 1,
    mysql: {
        config: {
            host: '',
            user: '',
            password: '',
            port: 3600,
            database: '',
        },
    },
};

export default config;
