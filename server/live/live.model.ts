import { AbstractModel } from "../common/model";
import { ThLiveOddsMsgBody } from "./types";
import { LiveMapper } from "./live.mapper";

export class LiveModel extends AbstractModel {
    constructor(protected mapper: LiveMapper) {
        super(mapper);
    }
    public saveMsg(msg: ThLiveOddsMsgBody): void {
        this.mapper.saveMsgToDb(msg);
    }
}
