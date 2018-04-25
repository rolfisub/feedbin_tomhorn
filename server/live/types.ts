interface OddsField {
    _: string;
    $: {
        active: "1" | "0";
        type: string;
        typeid: string;
    }
}
interface Odds {
    $: {
        active: "1" | "0";
        changed: "true" | "false";
        combination: string;
        freetext: string;
        id: string;
        specialoddsvalue: string;
        type: string;
        typeid: string;
        mostbalanced: string;
    };
    oddsfield?: OddsField[];
}

interface Card {
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

interface Score {
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

interface MatchIdModel {
    _: string;
    $: {
        id: string;
    }
}

interface MatchTeam extends MatchIdModel {
    $: {
        id: string;
        uniqueid: string;
    }
}

export interface MatchInfo {
    dateofmatch: string[];
    sport: MatchIdModel[];
    category: MatchIdModel[];
    tournament: MatchIdModel[];
    hometeam: MatchTeam[];
    awayteam: MatchTeam[];
}

export interface MatchModel {
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
    matchinfo?: MatchInfo[];
    score?: Score[];
    card?: Card[];
    odds?: Odds[];
}

export interface LiveOddsMsgBody {
    liveodds: {
        $: {
            "xmlns:xsd": string;
            "xmlns:xsi": string;
            status: string;
            timestamp: string;
        };
        match?: MatchModel[];
    };
}
