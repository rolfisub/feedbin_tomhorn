import { AbstractMapper } from "../mapper";
import {
    LiveEvent,
    LiveMeta,
    LiveMsgModel,
    LiveOddsInfo,
    LiveOddsSelection
} from "./live.types";
import { MysqlError } from "mysql";
import { PoolConnection } from "promise-mysql";

export interface IntegrationMsg<M> {
    data: M;
}

export abstract class CommonLiveMapper<M> extends AbstractMapper {
    public getCommonMsgModel(msg: IntegrationMsg<M>): LiveMsgModel {
        return {
            events: this.getEvents(msg),
            metas: this.getMetas(msg),
            oddsinfo: this.getOddsInfo(msg),
            oddsselections: this.getOddsSelections(msg)
        } as LiveMsgModel;
    }

    public abstract getEvents(msg: IntegrationMsg<M>): LiveEvent[];
    public abstract getMetas(msg: IntegrationMsg<M>): LiveMeta[];
    public abstract getOddsInfo(msg: IntegrationMsg<M>): LiveOddsInfo[];
    public abstract getOddsSelections(
        msg: IntegrationMsg<M>
    ): LiveOddsSelection[];

    public async saveLiveMsg(msg: LiveMsgModel): Promise<void> {
        this.saveLiveEvents(msg);
        this.saveLiveMetas(msg);
        this.saveLiveOddsInfo(msg);
        this.saveLiveOddsSelections(msg);
        return;
    }

    protected saveLiveMetas(msg: LiveMsgModel): void {
        this.getCon()
            .then(con => {
                msg.metas.forEach(async (m: LiveMeta) => {
                    await this.saveLiveMeta(m, con);
                });
                con.release();
            })
            .catch(err => {
                this.handleMysqlError(err);
            });
        return;
    }

    protected async saveLiveMeta(
        m: LiveMeta,
        con: PoolConnection
    ): Promise<void> {
        const exists = await this.metaLiveExists(m, con);
        if (exists) {
            //update
            await this.updateLiveMeta(m, con);
        } else {
            //insert
            await this.insertLiveMeta(m, con);
        }
    }

    protected async insertLiveMeta(
        m: LiveMeta,
        con: PoolConnection
    ): Promise<void> {
        const insert: string =
            "insert into liveodds_meta (" +
            " event_id, " +
            " meta_key, " +
            " meta_value) " +
            " values (?,?,?)";
        const values: string[] = [
            m.event_id,
            m.meta_key,
            m.meta_value ? m.meta_value : ""
        ];
        await con.query(insert, values);
    }

    protected async updateLiveMeta(
        m: LiveMeta,
        con: PoolConnection
    ): Promise<void> {
        const update: string =
            "update liveodds_meta set " +
            "meta_value = ? " +
            "where event_id = ? AND meta_key = ?";
        const values: string[] = [m.meta_value, m.event_id, m.meta_key];
        await con.query(update, values);
    }

    protected async metaLiveExists(
        m: LiveMeta,
        con: PoolConnection
    ): Promise<boolean> {
        const query =
            "select event_id, meta_key from liveodds_meta where event_id = ? AND meta_key = ?";
        const data = await con.query(query, [m.event_id, m.meta_key]);
        return !!data.length;
    }

    protected saveLiveEvents(msg: LiveMsgModel): void {
        this.getCon()
            .then(con => {
                msg.events.forEach(async (e: LiveEvent) => {
                    await this.saveLiveEvent(e, con);
                });
                con.release();
            })
            .catch(err => {
                this.handleMysqlError(err);
            });
        return;
    }

    protected async saveLiveEvent(
        e: LiveEvent,
        con: PoolConnection
    ): Promise<void> {
        const exists = await this.eventLiveExist(e.event_id, con);
        if (exists) {
            console.log("event_id exists " + e.event_id);
            console.log("updating event...");
            await this.updateLiveEvent(e, con);
            console.log("updated.");
        } else {
            console.log("event_id does not exists " + e.event_id);
            console.log("inserting...");
            await this.insertLiveEvent(e, con);
            console.log("done.");
        }
    }

    protected async updateLiveEvent(
        e: LiveEvent,
        con: PoolConnection
    ): Promise<void> {
        const update: string =
            "update liveodds_events set " +
            " event_name = ?, " +
            " away_rot = ?, " +
            " away_name = ?, " +
            " home_rot = ?, " +
            " home_name = ?, " +
            " sport_id = ?, " +
            " sport_name = ?, " +
            " league_id = ?, " +
            " league_name = ?, " +
            " event_startdate = ?, " +
            " extra_info = ?, " +
            " streaming = ?, " +
            " tv_channels = ? " +
            " where event_id = ?";
        const values: string[] = [
            e.event_name,
            e.away_rot,
            e.away_name,
            e.home_rot,
            e.home_name,
            e.sport_id,
            e.sport_name,
            e.league_id,
            e.league_name,
            e.event_startdate,
            e.extra_info,
            e.streaming,
            e.tv_channels,
            e.event_id
        ];
        await con.query(update, values);
    }

    protected async insertLiveEvent(
        e: LiveEvent,
        con: PoolConnection
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
            " `event_startdate`," +
            " `extra_info`," +
            " `streaming`," +
            " `tv_channels`)" +
            " values ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
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
            e.event_startdate,
            e.extra_info,
            e.streaming,
            e.tv_channels
        ];
        await con.query(insert, values);
    }

    protected async eventLiveExist(
        eventId: string,
        con: PoolConnection
    ): Promise<boolean> {
        const query = "select event_id from liveodds_events where event_id = ?";
        const data = await con.query(query, [eventId]);
        return !!data.length;
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
