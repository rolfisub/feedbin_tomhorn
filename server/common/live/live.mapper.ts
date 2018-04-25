import {AbstractMapper} from "../mapper";
import {LiveEvent, LiveMeta, LiveMsgModel, LiveOddsInfo, LiveOddsSelection} from "./live.types";

export interface IntegrationMsg<M> {
    data: M;
}

export abstract class CommonLiveMapper<M> extends AbstractMapper{
    protected getCommonMsgModel(msg: IntegrationMsg<M>): LiveMsgModel {
        return {
            events: this.getEvents(msg),
            metas: this.getMetas(msg),
            oddsinfo: this.getOddsInfo(msg),
            oddsselections: this.getOddsSelections(msg)
        } as LiveMsgModel;
    };

    protected abstract getEvents(msg: IntegrationMsg<M>): LiveEvent[];
    protected abstract getMetas(msg: IntegrationMsg<M>): LiveMeta[];
    protected abstract getOddsInfo(msg: IntegrationMsg<M>): LiveOddsInfo[];
    protected abstract getOddsSelections(msg: IntegrationMsg<M>): LiveOddsSelection[];
}
