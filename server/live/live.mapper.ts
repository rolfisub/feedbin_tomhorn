import { ThLiveOddsMsgBody, ThMatchModel, ThOdds, ThOddsField } from "./types";
import {
    LiveEvent,
    LiveMeta,
    LiveMsgModel,
    LiveOddsInfo,
    LiveOddsSelection
} from "../common/live/live.types";
import { CommonLiveMapper, IntegrationMsg } from "../common/live/live.mapper";
import * as moment from "moment";

export class LiveMapper extends CommonLiveMapper<ThLiveOddsMsgBody> {
    public async saveMsgToDb(msg: ThLiveOddsMsgBody): Promise<void> {
        const imsg: IntegrationMsg<ThLiveOddsMsgBody> = {
            data: msg
        };
        const liveMsgModel: LiveMsgModel = this.getCommonMsgModel(imsg);
        console.log("msg received, saving to db...");
        await this.saveLiveMsg(liveMsgModel);
        console.log("done.");
    }

    public getEvents(msg: IntegrationMsg<ThLiveOddsMsgBody>): LiveEvent[] {
        const events: LiveEvent[] = [];
        const match = msg.data.oddsmaker9000liveodds.match;
        match.forEach((m: ThMatchModel) => {
            if (m.matchinfo) {
                events.push({
                    event_id: m.$.matchid,
                    event_name:
                        m.matchinfo[0].awayteam[0]._ +
                        " vs " +
                        m.matchinfo[0].hometeam[0]._,
                    away_rot: m.matchinfo[0].awayteam[0].$.id,
                    away_name: m.matchinfo[0].awayteam[0]._,
                    home_rot: m.matchinfo[0].hometeam[0].$.id,
                    home_name: m.matchinfo[0].hometeam[0]._,
                    sport_id: m.matchinfo[0].sport[0].$.id,
                    sport_name: m.matchinfo[0].sport[0]._,
                    league_id:
                        m.matchinfo[0].category[0].$.id +
                        "_" +
                        m.matchinfo[0].tournament[0].$.id,
                    league_name:
                        m.matchinfo[0].category[0]._ +
                        " " +
                        m.matchinfo[0].tournament[0]._,
                    event_startdate: moment
                        .unix(parseInt(m.matchinfo[0].dateofmatch[0], 10))
                        .format("YYYY-MM-DD HH:MM:SS")
                        .toString(),
                    extra_info: "",
                    streaming: "",
                    tv_channels: ""
                });
            }
        }, this);

        return events;
    }

    public getOddsInfo(msg: IntegrationMsg<ThLiveOddsMsgBody>): LiveOddsInfo[] {
        const liveoddsinfo: LiveOddsInfo[] = [];
        const match = msg.data.oddsmaker9000liveodds.match;
        match.forEach((m: ThMatchModel) => {
            const { odds } = m;
            if (odds) {
                odds.forEach((o: ThOdds) => {
                    liveoddsinfo.push({
                        event_id: m.$.matchid,
                        odd_id: o.$.id,
                        odd_name: o.$.type,
                        odd_text: o.$.freetext,
                        odd_type_id: o.$.typeid,
                        odd_type: o.$.type,
                        odd_subtype: o.$.subtype ? o.$.subtype : '',
                        active: o.$.active === "1" ? "true" : "false",
                        handicap: o.$.specialoddsvalue ? o.$.specialoddsvalue : '',
                        handicap_rest: "",
                        changed: o.$.changed,
                        combinations: "",
                        is_balanced: ""
                    });
                });
            }
        });
        return liveoddsinfo;
    }

    public getOddsSelections(
        msg: IntegrationMsg<ThLiveOddsMsgBody>
    ): LiveOddsSelection[] {
        const liveoddssel: LiveOddsSelection[] = [];
        const match = msg.data.oddsmaker9000liveodds.match;
        match.forEach((m: ThMatchModel) => {
            const { odds } = m;
            if (odds) {
                odds.forEach((o: ThOdds) => {
                    const { oddsfield } = o;
                    let selId = 0;
                    if (oddsfield) {
                        oddsfield.forEach((of: ThOddsField) => {
                            liveoddssel.push({
                                event_id: m.$.matchid,
                                odd_id: o.$.id,
                                sel_id: selId.toString(),
                                sel_name: of.$.type,
                                sel_odd: of._,
                                active: of.$.active,
                                outcome: of.$.outcome ? of.$.outcome : "0",
                                void_factor: "-1",
                                player_id: -1,
                                type_id: parseInt(of.$.typeid, 10),
                                type_name: of.$.type
                            });
                            selId++;
                        });
                    }
                });
            }
        });
        return liveoddssel;
    }

    public getMetas(msg: IntegrationMsg<ThLiveOddsMsgBody>): LiveMeta[] {
        const metas: LiveMeta[] = [];
        const match = msg.data.oddsmaker9000liveodds.match;
        match.forEach((m: ThMatchModel) => {
            metas.push({
                event_id: m.$.matchid,
                meta_key: "bet_status",
                meta_value: m.$.betstatus.toUpperCase()
            });
            metas.push({
                event_id: m.$.matchid,
                meta_key: "cleared_score",
                meta_value: m.$.score
            });
            metas.push({
                event_id: m.$.matchid,
                meta_key: "event_status",
                meta_value: m.$.status.toUpperCase()
            });
            metas.push({
                event_id: m.$.matchid,
                meta_key: "game_score",
                meta_value: m.$.score
            });
            metas.push({
                event_id: m.$.matchid,
                meta_key: "match_time",
                meta_value: m.$.matchtime_extended
            });
           /* metas.push({
                event_id: m.$.matchid,
                meta_key: "remaining_time",
                meta_value: ""
            });
            metas.push({
                event_id: m.$.matchid,
                meta_key: "remaining_time_period",
                meta_value: ""
            });*/
            metas.push({
                event_id: m.$.matchid,
                meta_key: "score",
                meta_value: m.$.score
            });

            if (m.$.setscore1) {
                metas.push({
                    event_id: m.$.matchid,
                    meta_key: "set_scores",
                    meta_value: m.$.setscore1
                });
            } else if (m.$.setscore2) {
                metas.push({
                    event_id: m.$.matchid,
                    meta_key: "set_scores",
                    meta_value: m.$.setscore2
                });
            }
        });
        return metas;
    }
}
