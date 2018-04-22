import { Request, Response } from "express";
import * as path from "path";
import config from "../config";
import LiveModel from "./live.model";
import LiveMapper from "./live.mapper";
import { LiveOddsMsgBody } from "./types";

const liveMapper = new LiveMapper(config.mysql.config);
const liveModel = new LiveModel(liveMapper);

export const index = (req: Request, res: Response) => {
    liveModel.saveMsg(req.body as LiveOddsMsgBody);
    res.json({
        message: "Welcome to API skeleton",
        version: config.version,
        path: path.resolve("../server"),
        body: req.body
    });
};
