import { Request, Response } from "express";
import { AbstractController } from "../common/controller";
import { LiveModel } from "./live.model";
import { LiveOddsMsgBody } from "./types";

export class LiveController extends AbstractController {
    constructor(protected model: LiveModel) {
        super(model);
    }
    public create(req: Request, res: Response) {
        this.model.saveMsg(req.body as LiveOddsMsgBody);
        res.json({
            hello: "world",
            body: req.body
        });
    }
}
