export interface LiveEvent {
    event_id: string;
    event_name: string;
    away_rot: string;
    away_name: string;
    home_rot: string;
    home_name: string;
    sport_id: string;
    sport_name: string;
    league_id: string;
    league_name: string;
    event_startdate: string;
    extra_info: string;
    streaming: string;
    tv_channels: string;
}

export interface LiveMeta {
    event_id: string;
    meta_key: string;
    meta_value: string;
}

export interface LiveOddsInfo {
    event_id: string;
    odd_id: string;
    odd_name: string;
    odd_text: string;
    odd_type_id: string;
    odd_type: string;
    odd_subtype: string;
    active: string;
    handicap: string;
    handicap_rest: string;
    changed: string;
    combinations: string;
    is_balanced: string;
}

export interface LiveOddsSelection {
    event_id: string;
    odd_id: string;
    sel_id: string;
    sel_name: string;
    sel_odd: string;
    active: string;
    outcome: string;
    void_factor: string;
    player_id: number;
    type_id: number;
    type_name: string;
}

export interface LiveMsgModel {
    events: LiveEvent[];
    metas: LiveMeta[];
    oddsinfo: LiveOddsInfo[];
    oddsselections: LiveOddsSelection[];
}
