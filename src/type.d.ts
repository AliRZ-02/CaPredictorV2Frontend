interface IPlayerDetails {
    playerName: string;
    playerNumber: number;
    position: string;
    age: number;
    height: number;
    weight: number;
}

interface IBirthDataSchema {
    country: string;
    city: string;
}

interface IDraftDetailsSchema {
    year: number;
    round: number;
    pickInRound: number;
}

interface IPhotoDetailsSchema {
    teamLogo: string;
    headShotUrl: string;
    imageUrl: string;
}

interface IPlayer {
    playerId: string;
    playerDetails: IPlayerDetails;
    birthInformation: IBirthDataSchema;
    historicalData?: IDraftDetailsSchema;
    photoDetails?: IPhotoDetailsSchema;
}

interface IPlayerStats {
    gamesPlayed: number;
    goalsPer60?: number;
    assistsPer60?: number;
    PlusMinusPer60?: number;
    PenaltyMinutesPer60?: number;
    ShotsPer60?: number;
    ShootingPercentage?: number;
    PowerPlayPer60?: number;
    ShortHandedPer60?: number;
    EvenStrengthPer60?: number;
    FaceOffPercentage?: number;
    TimeOnIce?: number;
    goalsAgainstAverage?: number;
    savePercentage?: number;
    winPercentage?: number;
}

interface PlayerProps {
    playerId?: string;
    player?: IPlayer | null;
    playerStats?: IPlayerStats | null;
    playerValuation?: number | null;
    setPlayer: React.Dispatch<React.SetStateAction<IPlayer | undefined | null>>;
    setPlayerStats: React.Dispatch<
        React.SetStateAction<IPlayerStats | undefined | null>
    >;
    setPlayerValuation: React.Dispatch<
        React.SetStateAction<number | undefined | null>
    >;
    setPlayerId: React.Dispatch<React.SetStateAction<string | undefined>>;
}

type ApiDataType = {
    status: string;
    playerObject?: IPlayer;
    playerStats?: IPlayerStats;
    error?: string;
};

type ValuationDataType = {
    contract_length?: number;
    value?: number;
    error?: string;
    status?: number;
};

type PlayerListDataType = {
    name?: string;
    playerId?: string;
    error?: string;
    status?: number;
};
