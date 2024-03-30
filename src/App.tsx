import Fuse from "fuse.js";
import React, { Suspense, useState } from "react";

import { getPlayerList } from "./api/API";
import PlayerView from "./components/ViewPlayers";
import { DashboardLayout } from "./components/ViewPlayers";

const App: React.FC = () => {
    const [inputPlayer, setInputPlayer] = useState<string | undefined>();
    const [outputPlayer, setOutputPlayer] = useState<string | undefined>();
    const [players, setPlayers] = useState<PlayerListDataType[]>([]);
    const [player, setPlayer] = useState<IPlayer | undefined | null>();
    const [playerStats, setPlayerStats] = useState<
        IPlayerStats | undefined | null
    >();
    const [playerValuation, setPlayerValuation] = useState<
        number | undefined | null
    >();

    const playerInfo = (): void => {
        getPlayerList().then(({ data }) => {
            if (data.length > 0 && data[0]) {
                data = data.map((value) => {
                    value.name = value?.name?.toLowerCase();
                    return value;
                });
                setPlayers(data);
            }
        });
    };

    if (players.length === 0) {
        playerInfo();
    }

    const fuse = new Fuse(players, {
        keys: ["name", "playerId"],
    });

    const searchForPlayer = (): void => {
        if (inputPlayer) {
            const data = fuse.search(inputPlayer);
            setOutputPlayer(
                data.length > 0
                    ? data[0]?.item?.playerId
                    : undefined
            );
            setPlayer(null);
            setPlayerStats(null);
            setPlayerValuation(undefined);
        }
        return undefined;
    };

    return (
        <main className="App">
            <DashboardLayout
                children={[]}
                handler={setInputPlayer}
                buttonHandler={searchForPlayer}
            />
            <Suspense>
                <PlayerView
                    key={"PlayerView"}
                    playerId={outputPlayer}
                    player={player}
                    setPlayer={setPlayer}
                    playerStats={playerStats}
                    setPlayerStats={setPlayerStats}
                    playerValuation={playerValuation}
                    setPlayerValuation={setPlayerValuation}
                    setPlayerId={setOutputPlayer}
                />
            </Suspense>
        </main>
    );
};

export default App;
