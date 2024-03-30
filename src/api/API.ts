import axios, { AxiosResponse } from "axios";

import { REACT_APP_BASE_URL, REACT_APP_VALUATION_URL } from "../settings";

export const getPlayerById = async (
    playerId: string
): Promise<AxiosResponse<ApiDataType>> => {
    try {
        const playerData: AxiosResponse<ApiDataType> = await axios.get(
            REACT_APP_BASE_URL + `/player/${playerId}`
        );

        return playerData;
    } catch (error) {
        return {
            data: { error: String(error) },
        } as AxiosResponse<ApiDataType>;
    }
};

export const getPlayerValuation = async (
    playerName: string | undefined,
    contractLength: number
): Promise<AxiosResponse<ValuationDataType[]>> => {
    try {
        if (typeof playerName !== "string") {
            throw "Player name is not a string";
        }

        const playerValuation: AxiosResponse<ValuationDataType[]> =
            await axios.get(
                REACT_APP_VALUATION_URL +
                    `/?player_name=${encodeURIComponent(
                        playerName
                    )}&contract_length=${encodeURIComponent(contractLength)}`
            );

        return playerValuation;
    } catch (error) {
        return { data: [{ error: String(error) }] } as AxiosResponse<
            ValuationDataType[]
        >;
    }
};

export const getPlayerList = async (): Promise<
    AxiosResponse<PlayerListDataType[]>
> => {
    try {
        const playerList: AxiosResponse<PlayerListDataType[]> = await axios.get(
            `${REACT_APP_BASE_URL}/players`
        );
        return playerList;
    } catch (error) {
        return { data: [{ error: String(error) }] } as AxiosResponse<
            PlayerListDataType[]
        >;
    }
};
