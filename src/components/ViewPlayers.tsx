import { Alert } from "@mui/material";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import { alpha } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import * as React from "react";
import ReactLoading from "react-loading";

import { getPlayerById, getPlayerValuation } from "../api/API";
import Header from "./Header";
import Main from "./Main";

const CardComponent = styled(Card)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark"
        ? "#1A2027"
        : "#f9fafb",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    marginTop: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    borderRadius: 4,
    boxShadow: "none",
}));

type Props = PlayerProps;

const PlayerView: React.FC<Props> = (props) => {
    const player = props.player;
    const playerStats = props.playerStats;
    const playerValuation = props.playerValuation;
    const setPlayer = props.setPlayer;
    const setPlayerStats = props.setPlayerStats;
    const setPlayerValuation = props.setPlayerValuation;
    const setPlayerId = props.setPlayerId;

    const fetchPlayerInfo = (playerId: string): void => {
        getPlayerById(playerId)
            .then(({ data: { playerObject, playerStats } }) => {
                getPlayerValuation(playerObject?.playerDetails.playerName, 8)
                    .then(({ data }) => {
                        data[0].error
                            ? setPlayerValuation(null)
                            : setPlayerValuation(data[0].value);
                    })
                    .catch(() => {
                        setPlayerValuation(null);
                    });
                setPlayer(playerObject);
                setPlayerStats(playerStats);
            })
            .catch(() => {
                setPlayerId(undefined);
                setPlayerValuation(undefined);
                setPlayerStats(undefined);
                setPlayer(undefined);
            });
    };

    const Loader = () => (
        <ReactLoading
            type="bars"
            color="#31363F"
            width={"25%"}
            height={"25%"}
        />
    );
    const InfoCard = (data: { title: string; information: string }) => {
        return (
            <Grid item xs={12} md={data.title !== "Value"
                ? 6
                : 12}>
                <Paper
                    sx={{
                        background: "#FFFFFF",
                        borderRadius: 2,
                        padding: 1,
                        margin: 0,
                    }}>
                    <b> {data.title} </b>
                    <Typography variant="body2" color="text.secondary">
                        {data.information}
                    </Typography>
                </Paper>
            </Grid>
        );
    };

    const StatsCard = (data: {
        title: string;
        information: number | undefined;
    }) => {
        const bgColor =
            typeof data.information === "number" && data.information < 50
                ? "#FA7070"
                : "#008DDA";

        let bgOpacity =
            typeof data.information === "number"
                ? data.information
                : 50;
        bgOpacity = (Math.abs(bgOpacity - 50) * 2) / 100;
        return (
            <Grid
                item
                xs={6}
                md={3}
                height={"auto"}
                justifyContent="flex-end"
                alignItems="center">
                <Paper
                    component={Stack}
                    direction="column"
                    justifyContent="center"
                    elevation={0}
                    sx={{
                        background: "#f9fafb",
                        margin: 0,
                    }}>
                    <b style={{ fontSize: 32 }}> {data.title} </b>
                </Paper>
                <Paper
                    sx={{
                        background: alpha(bgColor, bgOpacity),
                        borderTopLeftRadius: 2,
                        borderTopRightRadius: 2,
                        padding: 1,
                        margin: 0,
                        aspectRatio: "1",
                    }}
                    elevation={0}
                    component={Stack}
                    direction="column"
                    justifyContent="center">
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        fontSize={`${window.innerWidth > 500
                            ? 500
                            : 300}%`}
                        alignContent={"center"}>
                        {data.information}%
                    </Typography>
                </Paper>
            </Grid>
        );
    };

    const DataList = [
        {
            title: "Name",
            information: `${player?.playerDetails?.playerName}`,
        },
        {
            title: "Number",
            information: `#${player?.playerDetails?.playerNumber}`,
        },
        {
            title: "Position",
            information: `${player?.playerDetails?.position}`,
        },
        {
            title: "Height",
            information: `${player?.playerDetails?.height} cm`,
        },
        {
            title: "Weight",
            information: `${player?.playerDetails?.weight} kg`,
        },
        {
            title: "Age",
            information: `${player?.playerDetails?.age}`,
        },
        {
            title: "Born in",
            information: `${player?.birthInformation?.city}, ${player?.birthInformation?.country}`,
        },
        {
            title: player?.historicalData?.year
                ? `Draft (${player?.historicalData?.year})`
                : "Draft",
            information: player?.historicalData?.year
                ? `Pick ${player?.historicalData?.pickInRound} ― Round ${player?.historicalData?.round}`
                : "Undrafted",
        },
    ];

    const SkaterStatsList = [
        {
            title: "GP",
            information: playerStats?.gamesPlayed,
        },
        {
            title: "G/60",
            information: playerStats?.goalsPer60,
        },
        {
            title: "A/60",
            information: playerStats?.assistsPer60,
        },
        {
            title: `EVP/60`,
            information: playerStats?.EvenStrengthPer60,
        },
        {
            title: "PPP/60",
            information: playerStats?.PowerPlayPer60,
        },
        {
            title: "SHP/60",
            information: playerStats?.ShortHandedPer60,
        },
        {
            title: "+/-",
            information: playerStats?.PlusMinusPer60,
        },
        {
            title: "PIM/60",
            information: playerStats?.PenaltyMinutesPer60,
        },
        {
            title: "S/60",
            information: playerStats?.ShotsPer60,
        },
        {
            title: `Shoot %`,
            information: playerStats?.ShootingPercentage,
        },
        {
            title: "FO %",
            information: playerStats?.FaceOffPercentage,
        },
        {
            title: "TOI",
            information: playerStats?.TimeOnIce,
        },
    ];

    const GoalieStatsList = [
        {
            title: "GP",
            information: playerStats?.gamesPlayed,
        },
        {
            title: "GAA",
            information: playerStats?.goalsAgainstAverage,
        },
        {
            title: "SV %",
            information: playerStats?.savePercentage,
        },
        {
            title: `Win %`,
            information: playerStats?.winPercentage,
        },
    ];

    const PlayerStats = () => {
        const statCardMapper = (
            objList: { title: string; information: number | undefined }[]
        ) => {
            return objList.map((obj) => (
                <StatsCard
                    title={obj.title}
                    information={obj.information}
                    key={obj.title}
                />
            ));
        };

        return player?.playerDetails?.position === "G"
            ? statCardMapper(GoalieStatsList)
            : statCardMapper(SkaterStatsList);
    };

    if (props.playerId === undefined) {
        return (
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}>
                <Grid item xs={12} md={12} textAlign={"center"}>
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        fontSize={`${window.innerWidth > 500
                            ? 200
                            : 125}%`}
                        alignContent={"center"}>
                        Search for a player to get started!
                    </Typography>
                    <Card>
                        <CardMedia
                            component="img"
                            alt="CaPredictor Logo."
                            image="https://github.com/AliRZ-02/CaPredictor/blob/main/static/Resources/CaPredictorLogo.png?raw=true"
                            style={{ borderRadius: 4, background: "#FFF" }}
                        />
                    </Card>
                </Grid>
            </div>
        );
    }

    if (player && playerStats) {
        return (
            <Grid container spacing={2}>
                <Grid item xs={12} md={3}>
                    <CardComponent>
                        <Paper
                            sx={{
                                background: "#FFFFFF",
                                borderRadius: 2,
                                padding: 1,
                                margin: 0,
                            }}>
                            <CardMedia
                                component="img"
                                image={player?.photoDetails?.imageUrl}
                                style={{ borderRadius: 4, background: "#FFF" }}
                            />
                        </Paper>
                        <CardContent>
                            <Grid container spacing={1}>
                                {DataList.map((obj) => (
                                    <InfoCard
                                        title={obj.title}
                                        information={obj.information}
                                        key={obj.title}
                                    />
                                ))}
                                <InfoCard
                                    title="Value"
                                    information={`${
                                        playerValuation
                                            ? `$${playerValuation
                                                .toFixed(0)
                                                .toString()
                                                .replace(
                                                    /\B(?=(\d{3})+(?!\d))/g,
                                                    ","
                                                )} 🤯`
                                            : playerValuation === undefined
                                                ? "Calculating 🤓 ..."
                                                : "Could not determine 😔"
                                    }`}
                                />
                            </Grid>
                        </CardContent>
                    </CardComponent>
                </Grid>
                <Grid item xs={12} md={9}>
                    <CardComponent>
                        <CardContent>
                            <Grid textAlign={"center"} sx={{marginBottom: 2}}>
                                <Alert severity="info">
                                    These stats show the percentile rankings for the player
                                </Alert>
                            </Grid>
                            <Grid container spacing={1}>
                                {PlayerStats()}
                            </Grid>
                        </CardContent>
                    </CardComponent>
                </Grid>
            </Grid>
        );
    } else {
        fetchPlayerInfo(props.playerId);

        return (
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}>
                <Loader />
            </div>
        );
    }
};

interface DashboardLayoutTypes {
    children: React.ReactNode;
    handler: React.Dispatch<React.SetStateAction<string | undefined>>;
    buttonHandler: () => void;
}

export function DashboardLayout({
    children,
    handler,
    buttonHandler,
}: DashboardLayoutTypes) {
    return (
        <>
            <Header handler={handler} buttonHandler={buttonHandler} />

            <Box
                sx={{
                    minHeight: 1,
                    display: "flex",
                    flexDirection: { xs: "column", lg: "row" },
                }}>
                <Main>{children}</Main>
            </Box>
        </>
    );
}

export default PlayerView;
