import { Connection, MysqlError, Pool, Query } from "mysql";
import { createMysqlConnectionPool } from "../services/mysql.connection";
import config from "../config";
import { LiveEvent, LiveMsgModel } from "./live/live.types";

export class AbstractMapper {
    protected pool: Pool;
    constructor() {
        this.pool = createMysqlConnectionPool(config.mysql.config);
        this.getCon = this.getCon.bind(this);
    }

    public getCon(callback: (err: MysqlError, con: Connection) => void): void {
        return this.pool.getConnection(callback);
    }

    public saveLiveMsg(msg: LiveMsgModel): void {
        this.saveLiveEvents(msg);
        this.saveLiveMetas(msg);
        this.saveLiveOddsInfo(msg);
        this.saveLiveOddsSelections(msg);
    }

    protected saveLiveEvents(msg: LiveMsgModel): void {
        this.getCon((err: MysqlError, con: Connection) => {
            if (err) {
                this.handleMysqlError(err);
            }
            msg.events.forEach(async (e: LiveEvent) => {
                await this.saveLiveEvent(e, con);
            });
        });
        return;
    }

    protected async saveLiveEvent(
        e: LiveEvent,
        con: Connection
    ): Promise<void> {
        if (await this.eventLiveExist(e.event_id, con)) {
            console.log("event_id exists " + e.event_id);
        } else {
            console.log("event_id does not exists " + e.event_id);
            console.log("inserting...");
            await this.insertLiveEvent(e, con);
            console.log("done.");
        }
    }

    protected async insertLiveEvent(
        e: LiveEvent,
        con: Connection
    ): Promise<void> {
        const insert: string =
            "insert into liveodds_events (" +
            "`event_id`," +
            " `event_name`," +
            " `away_rot`," +
            " `away_name`," +
            " `home_rot`," +
            " `home_name`," +
            " `sport_id`," +
            " `sport_name`," +
            " `league_id`," +
            " `league_name`," +
            " `event_startdate`)" +
            " values ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        const values: string[] = [
            e.event_id,
            e.event_name,
            e.away_rot,
            e.away_name,
            e.home_rot,
            e.home_name,
            e.sport_id,
            e.sport_name,
            e.league_id,
            e.league_name,
            e.event_startdate
        ];
        await con.query(insert, values);
    }

    protected async eventLiveExist(
        eventId: string,
        con: Connection
    ): Promise<boolean> {
        const query =
            "select event_id from liveodds_events where event_id = '" +
            eventId +
            "'";
        const data: Query = await con.query(query);
        console.log(data.values);
        return !!data.values;
    }

    protected saveLiveMetas(msg: LiveMsgModel): void {
        return;
    }

    protected saveLiveOddsInfo(msg: LiveMsgModel): void {
        return;
    }

    protected saveLiveOddsSelections(msg: LiveMsgModel): void {
        return;
    }

    private handleMysqlError(err: MysqlError): void {
        return;
    }
}
