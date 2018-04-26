import {AbstractMapper} from "../mapper";
import {LiveEvent, LiveMeta, LiveMsgModel, LiveOddsInfo, LiveOddsSelection} from "./live.types";

export interface IntegrationMsg<M> {
    data: M;
}

export abstract class CommonLiveMapper<M> extends AbstractMapper{
    public getCommonMsgModel(msg: IntegrationMsg<M>): LiveMsgModel {
        return {
            events: this.getEvents(msg),
            metas: this.getMetas(msg),
            oddsinfo: this.getOddsInfo(msg),
            oddsselections: this.getOddsSelections(msg)
        } as LiveMsgModel;
    };

    public abstract getEvents(msg: IntegrationMsg<M>): LiveEvent[];
    public abstract getMetas(msg: IntegrationMsg<M>): LiveMeta[];
    public abstract getOddsInfo(msg: IntegrationMsg<M>): LiveOddsInfo[];
    public abstract getOddsSelections(msg: IntegrationMsg<M>): LiveOddsSelection[];
}
