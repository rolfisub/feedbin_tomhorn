import { LiveOddsMsgBody } from "./types";
import LiveMapper from "./live.mapper";

export default class LiveModel {
    constructor(protected mapper: LiveMapper) {
        this.saveMsg = this.saveMsg.bind(this);
    }

    public saveMsg(body: LiveOddsMsgBody) {
        console.log("saving msg to mysql server");
        this.mapper.saveMsg(body);
    }
}
