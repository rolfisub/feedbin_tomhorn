import { Request, Response } from "express";
import { AbstractModel } from "./model";

export class AbstractController {
    constructor(protected model: AbstractModel) {
        this.create = this.create.bind(this);
    }
    public create(req: Request, res: Response) {
        return;
    }
}
