import {Request, Response} from "express";
import * as path from 'path';
import config from './config';

export const index = (req: Request, res: Response) => {
    res.json( {
        message: 'Welcome to API skeleton',
        version: config.version,
        path: path.resolve('../server'),
    });
};
