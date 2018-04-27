import { Request, Response } from "express";
import { AbstractController } from "../common/controller";
import { LiveModel } from "./live.model";
import { ThLiveOddsMsgBody } from "./types";

export class LiveController extends AbstractController {
    constructor(protected model: LiveModel) {
        super(model);
    }
    public create(req: Request, res: Response) {
        this.model.saveMsg(req.body as ThLiveOddsMsgBody);
        res.json({
            hello: "world",
            body: req.body
        });
    }
}

/**
 * TODO:
 * extract meta data
 * remove engine fields from interfaces DONE
 * save events to mysql
 * save oddsinfo to mysql
 * save odds selection to mysql
 * save meta data to mysql
 */
