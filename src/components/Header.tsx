import { Typography } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import PropTypes from "prop-types";

import Searchbar from "./common/searchbar";

interface HeaderProps {
    handler: React.Dispatch<React.SetStateAction<string | undefined>>;
    buttonHandler: () => void;
}

export default function Header({ handler, buttonHandler }: HeaderProps) {
    const renderContent = (
        <>
            <Searchbar handler={handler} buttonHandler={buttonHandler} />
            <Box sx={{ flexGrow: 1 }} />
            <Stack direction="row" alignItems="center" spacing={1}>
                <Typography>CaPredictorV2</Typography>
            </Stack>
        </>
    );
    return (
        <AppBar
            position="static"
            style={{ background: "#31363F" }}
            elevation={0}>
            <Toolbar>{renderContent}</Toolbar>
        </AppBar>
    );
}

Header.propTypes = {
    onOpenNav: PropTypes.func,
};
