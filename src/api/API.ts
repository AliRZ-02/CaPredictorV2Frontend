import axios, { AxiosResponse } from "axios";

import {
    REACT_APP_BASE_URL,
    REACT_APP_PLAYER_LIST_URL,
    REACT_APP_VALUATION_URL,
} from "../settings";

export const getPlayerById = async (
    playerId: string,
    retries = 1
): Promise<AxiosResponse<ApiDataType>> => {
    try {
        const playerData: AxiosResponse<ApiDataType> = await axios.get(
            REACT_APP_BASE_URL + `/player/${playerId}`
        );

        return playerData;
    } catch (error) {
        return retries !== 0
            ? getPlayerById(playerId, retries - 1)
            : ({
                data: { error: String(error) },
            } as AxiosResponse<ApiDataType>);
    }
};

export const getPlayerValuation = async (
    playerName: string | undefined,
    contractLength: number,
    retries = 1
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
        return retries !== 0
            ? getPlayerValuation(playerName, contractLength, retries - 1)
            : ({ data: [{ error: String(error) }] } as AxiosResponse<
                  ValuationDataType[]
              >);
    }
};

export const getPlayerList = async (
    retries = 1
): Promise<AxiosResponse<PlayerListDataType[]>> => {
    try {
        const playerList: AxiosResponse<PlayerListDataType[]> = await axios.get(
            `${REACT_APP_PLAYER_LIST_URL}`
        );
        return playerList;
    } catch (error) {
        return retries !== 0
            ? getPlayerList(retries - 1)
            : ({ data: [{ error: String(error) }] } as AxiosResponse<
                  PlayerListDataType[]
              >);
    }
};
