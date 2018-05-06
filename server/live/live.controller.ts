import { Request, Response } from "express";
import { AbstractController } from "../common/controller";
import { LiveModel } from "./live.model";
import { ThLiveOddsMsgBody } from "./types";
import { parseString } from "xml2js";

export class LiveController extends AbstractController {
    constructor(protected model: LiveModel) {
        super(model);
    }
    public create(req: Request, res: Response) {
        const parseOpt = {
            async: false,
            explicitArray: true,
            normalize: true,
            normalizeTags: true,
            trim: true
        };

        const msg = req.body.om9000_data;
        parseString(msg, parseOpt, (err, result) => {
            this.model.saveMsg(result as ThLiveOddsMsgBody);
        });
        this.model.logMsg(req.body as ThLiveOddsMsgBody, req);
        res.json({
            success: true
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
