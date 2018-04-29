
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
    public user: string;
    public country: number;
    public actScore: number;
    public songScore: number;
    public voiceScore: number;
    public confirmed: boolean;
}

