import { LiveOddsMsgBody } from "./types";
import {
    LiveEvent,
    LiveMeta,
    LiveOddsInfo,
    LiveOddsSelection
} from "../common/live/live.types";
import { CommonLiveMapper, IntegrationMsg } from "../common/live/live.mapper";

export class LiveMapper extends CommonLiveMapper<LiveOddsMsgBody> {
    protected getEvents(msg: IntegrationMsg<LiveOddsMsgBody>): LiveEvent[] {
        const events: LiveEvent[] = [];
        const match = msg.data.liveodds.match;
        match.forEach((m, index) => {
            if (m.matchinfo) {
                events.push({
                    event_id: m.$.matchid,
                    event_name:
                        m.matchinfo[0].awayteam +
                        " vs " +
                        m.matchinfo[0].hometeam,
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

    protected getMetas(msg: IntegrationMsg<LiveOddsMsgBody>): LiveMeta[] {
        const metas: LiveMeta[] = [];

    }

    protected getOddsInfo(
        msg: IntegrationMsg<LiveOddsMsgBody>
    ): LiveOddsInfo[] {

    }

    protected getOddsSelections(
        msg: IntegrationMsg<LiveOddsMsgBody>
    ): LiveOddsSelection[] {

    }
}
