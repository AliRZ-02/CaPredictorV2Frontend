import "./index.css";
import "@fontsource/public-sans"; // Defaults to weight 400
import "@fontsource/public-sans/400.css"; // Specify weight
import "@fontsource/public-sans/400-italic.css"; // Specify weight and style

import Grid from "@mui/material/Grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";

const theme = createTheme({
    typography: {
        allVariants: {
            fontFamily: "Public Sans",
            textTransform: "none",
            fontSize: 16,
        },
    },
});

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);
root.render(
    <ThemeProvider theme={theme}>
        <Grid
            spacing={2}
            sx={{
                justify: "flex-end",
                alignItems: "center",
            }}>
            <React.StrictMode>
                <App />
            </React.StrictMode>
        </Grid>
    </ThemeProvider>
);
