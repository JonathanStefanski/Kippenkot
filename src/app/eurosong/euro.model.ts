
interface ICountry {
    id: number;
    followNr: number;
    country: string;
    code: string;
    artist: string;
    song: string;
    totalScore: number;
    confirmed: boolean;
    scores: IScore[];
}

interface IScore {
    user: string;
    userName: string;
    country: number;
    actScore: number;
    songScore: number;
    voiceScore: number;
    confirmed: boolean;
}

export class Country implements ICountry {
    public id: number;
    public followNr: number;
    public country: string;
    public code: string;
    public artist: string;
    public song: string;
    public totalScore: number;
    public confirmed: boolean;
    public scores: Score[];
}

export class Score implements IScore {    
    constructor(user: string, country: number) {
        this.user = user;
        this.country = country;
        this.actScore = 0;
        this.songScore = 0;
        this.voiceScore = 0;
    }

    public user: string;
    public userName: string;
    public country: number;
    public actScore: number;
    public songScore: number;
    public voiceScore: number;
    public confirmed: boolean;
}

