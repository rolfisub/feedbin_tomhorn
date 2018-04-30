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
        this.saveLiveOddsInfos(msg);
        this.saveLiveOddsSelections(msg);
        return;
    }

    protected saveLiveOddsSelections(msg: LiveMsgModel): void {
        this.getCon()
            .then(con => {
                msg.oddsselections.forEach(async (os: LiveOddsSelection) => {
                    await this.saveLiveOddsSelection(os, con);
                });
                con.release();
            })
            .catch(err => {
                this.handleMysqlError(err);
            });
    }

    protected async saveLiveOddsSelection(
        os: LiveOddsSelection,
        con: PoolConnection
    ): Promise<void> {
        const exist: boolean = await this.oddsSelectionExists(os, con);
        if (exist) {
            //update
            await this.updateLiveOddsSelection(os, con);
        } else {
            //insert
            await this.insertLiveOddsSelection(os, con);
        }
    }

    protected async insertLiveOddsSelection(
        os: LiveOddsSelection,
        con: PoolConnection
    ): Promise<void> {
        const insert: string =
            "insert into liveodds_odds_sel (" +
            " event_id, " +
            " odd_id, " +
            " sel_id, " +
            " sel_name, " +
            " sel_odd," +
            " active," +
            " outcome," +
            " void_factor," +
            " player_id, " +
            " type_id," +
            " type_name) " +
            " values (?,?,?,?,?,?,?,?,?,?,?)";
        const values: any[] = [
            os.event_id,
            os.odd_id,
            os.sel_id,
            os.sel_name,
            os.sel_odd,
            os.active,
            os.outcome,
            os.void_factor,
            os.player_id,
            os.type_id,
            os.type_name
        ];
        await con.query(insert, values);
    }

    protected async updateLiveOddsSelection(
        os: LiveOddsSelection,
        con: PoolConnection
    ): Promise<void> {
        const update: string =
            "update liveodds_odds_sel set " +
            " sel_name = ?," +
            " sel_odd = ?, " +
            " active = ?, " +
            " outcome = ?," +
            " void_factor = ? ," +
            " player_id = ?, " +
            " type_id = ?, " +
            " type_name = ? " +
            " where event_id = ? AND odd_id = ? AND sel_id = ?";
        const values: any[] = [
            os.sel_name,
            os.sel_odd,
            os.active,
            os.outcome,
            os.void_factor,
            os.player_id,
            os.type_id,
            os.type_name,
            os.event_id,
            os.odd_id,
            os.sel_id
        ];
        await con.query(update, values);
    }

    protected async oddsSelectionExists(
        os: LiveOddsSelection,
        con: PoolConnection
    ): Promise<boolean> {
        const query =
            "select event_id, odd_id, sel_id from liveodds_odds_sel where event_id = ? AND odd_id = ? AND sel_id = ?";
        const data = await con.query(query, [
            os.event_id,
            os.odd_id,
            os.sel_id
        ]);
        return !!data.length;
    }

    protected saveLiveOddsInfos(msg: LiveMsgModel): void {
        this.getCon()
            .then(con => {
                msg.oddsinfo.forEach(async (oi: LiveOddsInfo) => {
                    await this.saveLiveOddsInfo(oi, con);
                });
                con.release();
            })
            .catch(err => {
                this.handleMysqlError(err);
            });
        return;
    }

    protected async saveLiveOddsInfo(
        oi: LiveOddsInfo,
        con: PoolConnection
    ): Promise<void> {
        const exists = await this.oddsInfoExists(oi, con);
        if (exists) {
            //update
            await this.updateLiveOddsInfo(oi, con);
        } else {
            //insert
            await this.insertLiveOddsInfo(oi, con);
        }
    }

    protected async updateLiveOddsInfo(
        oi: LiveOddsInfo,
        con: PoolConnection
    ): Promise<void> {
        const update: string =
            "update liveodds_oddsinfo set " +
            " odd_name = ?," +
            " odd_text = ?," +
            " odd_type_id = ?," +
            " odd_type = ?," +
            " odd_subtype = ?," +
            " active = ?," +
            " handicap = ?," +
            " handicap_rest = ?," +
            " changed = ?, " +
            " combinations = ?," +
            " is_balanced = ? " +
            " where event_id = ? AND odd_id = ?";
        const values: string[] = [
            oi.odd_name,
            oi.odd_text,
            oi.odd_type_id,
            oi.odd_type,
            oi.odd_subtype,
            oi.active,
            oi.handicap,
            oi.handicap_rest,
            oi.changed,
            oi.combinations,
            oi.is_balanced,
            oi.event_id,
            oi.odd_id
        ];
        await con.query(update, values);
    }

    protected async insertLiveOddsInfo(
        oi: LiveOddsInfo,
        con: PoolConnection
    ): Promise<void> {
        const insert: string =
            "insert into liveodds_oddsinfo (" +
            " event_id, " +
            " odd_id, " +
            " odd_name," +
            " odd_text," +
            " odd_type_id," +
            " odd_type," +
            " odd_subtype," +
            " active," +
            " handicap," +
            " handicap_rest," +
            " changed, " +
            " combinations," +
            " is_balanced) " +
            " values (?,?,?,?,?,?,?,?,?,?,?,?,?)";
        const values: string[] = [
            oi.event_id,
            oi.odd_id,
            oi.odd_name,
            oi.odd_text,
            oi.odd_type_id,
            oi.odd_type,
            oi.odd_subtype,
            oi.active,
            oi.handicap,
            oi.handicap_rest,
            oi.changed,
            oi.combinations,
            oi.is_balanced
        ];
        await con.query(insert, values);
    }

    protected async oddsInfoExists(
        oi: LiveOddsInfo,
        con: PoolConnection
    ): Promise<boolean> {
        const query =
            "select event_id, odd_id from liveodds_oddsinfo where event_id = ? AND odd_id = ?";
        const data = await con.query(query, [oi.event_id, oi.odd_id]);
        return !!data.length;
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
        const values: string[] = [
            m.meta_value,
            m.event_id,
            m.meta_key ? m.meta_value : ""
        ];
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

    private handleMysqlError(err: MysqlError): void {
        return;
    }
}
