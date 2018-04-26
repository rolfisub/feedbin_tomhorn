export interface ThOddsField {
    _: string;
    $: {
        active: "1" | "0";
        type: string;
        typeid: string;
    }
}
export interface ThOdds {
    $: {
        active: "1" | "0";
        changed: "true" | "false";
        combination: string;
        freetext: string;
        id: string;
        specialoddsvalue: string;
        subtype: string;
        type: string;
        typeid: string;
        mostbalanced: string;
    };
    oddsfield?: ThOddsField[];
}

export interface ThCard {
    $: {
        canceled: "true" | "false";
        id: string;
        player: string;
        team: "home" | "away",
        time: string;
        type: string;
        playerid: string;
    }
}

export interface ThScore {
    $: {
        home: string;
        away: string;
        id: string;
        player: string;
        scoringteam: "home" | "away";
        time: string;
        type: string;
        playerid: string;
    }
}

export interface ThMatchIdModel {
    _: string;
    $: {
        id: string;
    }
}

export interface ThMatchTeam extends ThMatchIdModel {
    $: {
        id: string;
        uniqueid: string;
    }
}

export interface ThMatchInfo {
    dateofmatch: string[];
    sport: ThMatchIdModel[];
    category: ThMatchIdModel[];
    tournament: ThMatchIdModel[];
    hometeam: ThMatchTeam[];
    awayteam: ThMatchTeam[];
}

export interface ThMatchModel {
    $: {
        active: string;
        betstatus: string;
        matchid: string;
        msgnr: string;
        cornersaway: string;
        cornershome: string;
        redcardsaway: string;
        redcardshome: string;
        yellowcardsaway: string;
        yellowcardshome: string;
        yellowredcardssaway: string;
        yellowredcardshome: string;
        score: string;
        status: string;
    };
    matchinfo?: ThMatchInfo[];
    score?: ThScore[];
    card?: ThCard[];
    odds?: ThOdds[];
}

export interface ThLiveOddsMsgBody {
    oddsmaker9000liveodds: {
        $: {
            "xmlns:xsd": string;
            "xmlns:xsi": string;
            status: string;
            timestamp: string;
        };
        match?: ThMatchModel[];
    };
}
