import { AbstractModel } from "../common/model";
import { LiveOddsMsgBody } from "./types";

export class LiveModel extends AbstractModel {
    public saveMsg(msg: LiveOddsMsgBody): void {
        console.log("msg received.");
    }
}
