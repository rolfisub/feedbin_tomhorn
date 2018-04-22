export interface MatchBody {
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
}

export interface LiveOddsMsgBody {
    liveodds: {
        $: {
            "xmlns:xsd": string;
            "xmlns:xsi": string;
            status: string;
            timestamp: string;
        };
        match: MatchBody[];
    };
}
