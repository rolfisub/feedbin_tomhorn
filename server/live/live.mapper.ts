import {ThLiveOddsMsgBody, ThMatchModel, ThOdds, ThOddsField} from "./types";
import {
    LiveEvent,
    LiveMeta, LiveMsgModel,
    LiveOddsInfo,
    LiveOddsSelection
} from "../common/live/live.types";
import { CommonLiveMapper, IntegrationMsg } from "../common/live/live.mapper";

export class LiveMapper extends CommonLiveMapper<ThLiveOddsMsgBody> {
    public saveMsgToDb(msg: ThLiveOddsMsgBody): void {
        const imsg: IntegrationMsg<ThLiveOddsMsgBody> = {
            data: msg
        };
        const liveMsgModel: LiveMsgModel = this.getCommonMsgModel(imsg);
        console.log(liveMsgModel);
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
                    event_startdate: m.matchinfo[0].dateofmatch[0],
                    extra_info: "",
                    streaming: "",
                    tv_channels: "",
                    is_sport_frozen: 0,
                    is_league_frozen: 0,
                    is_event_frozen: 0
                });
            }
        }, this);

        return events;
    }



    public getOddsInfo(
        msg: IntegrationMsg<ThLiveOddsMsgBody>
    ): LiveOddsInfo[] {
        const liveoddsinfo: LiveOddsInfo[] = [];
        const match = msg.data.oddsmaker9000liveodds.match;
        match.forEach((m: ThMatchModel)=> {
            const {odds} = m;
            if(odds) {
                odds.forEach((o: ThOdds) => {
                    liveoddsinfo.push({
                        event_id: m.$.matchid,
                        odd_id: o.$.id,
                        odd_name: o.$.type,
                        odd_text: o.$.freetext,
                        odd_type_id: o.$.typeid,
                        odd_type: o.$.type,
                        odd_subtype: o.$.subtype,
                        active: o.$.active === '1' ? "true" : "false",
                        handicap: o.$.specialoddsvalue,
                        handicap_rest: '',
                        changed: o.$.changed,
                        combinations: '',
                        is_balanced: '',
                        manual: 0,
                        is_line_frozen: 0
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
        match.forEach((m: ThMatchModel)=> {
            const {odds} = m;
            if(odds) {
                odds.forEach((o: ThOdds) => {
                    const {oddsfield} = o;
                    var selId = 0;
                    if(oddsfield) {
                        oddsfield.forEach((of: ThOddsField) => {
                            liveoddssel.push({
                                event_id: m.$.matchid,
                                odd_id: o.$.id,
                                sel_id: selId.toString(),
                                sel_name: of.$.type,
                                sel_odd: of._,
                                active: of.$.active,
                                outcome: '',
                                void_factor: '-1',
                                player_id: -1,
                                type_id: parseInt(of.$.typeid, 10),
                                type_name: of.$.type,
                                auto: 0,
                                is_selection_frozen: '',
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
        return metas;
    }

}
