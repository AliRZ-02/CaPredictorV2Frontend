import Button from "@mui/material/Button";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import Slide from "@mui/material/Slide";
import { styled } from "@mui/material/styles";
import { useState } from "react";

import Iconify from "../iconify";

// ----------------------------------------------------------------------

const HEADER_MOBILE = 64;
const HEADER_DESKTOP = 64;

const StyledSearchbar = styled("div")(({ theme }) => ({
    top: 0,
    left: 0,
    zIndex: 0,
    width: "25%",
    display: "flex",
    position: "absolute",
    alignItems: "center",
    height: HEADER_MOBILE,
    padding: theme.spacing(0, window.innerWidth > 500
        ? 0
        : 3),
    [theme.breakpoints.up("md")]: {
        height: HEADER_DESKTOP,
        padding: theme.spacing(0, 5),
    },
}));

interface SearchbarProps {
    handler: React.Dispatch<React.SetStateAction<string | undefined>>;
    buttonHandler: () => void;
}

export default function Searchbar({ handler, buttonHandler }: SearchbarProps) {
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(!open);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const searchButton = () => {
        handleClose();
        buttonHandler();
    };

    const updateInputPlayer = (event: React.ChangeEvent<HTMLInputElement>) => {
        handler(event.target.value.toLowerCase());
    };

    return (
        <ClickAwayListener onClickAway={handleClose}>
            <div>
                {!open && (
                    <IconButton onClick={handleOpen}>
                        <Iconify icon="eva:search-fill" style="#EEEEEE" />
                    </IconButton>
                )}

                <Slide direction="down" in={open} mountOnEnter unmountOnExit>
                    <StyledSearchbar>
                        <Input
                            autoFocus
                            fullWidth
                            disableUnderline
                            placeholder="Search…"
                            style={{ color: "#EEEEEE" }}
                            onChange={updateInputPlayer}
                            startAdornment={
                                <InputAdornment position="start">
                                    <Iconify
                                        icon="eva:search-fill"
                                        style="#EEEEEE"
                                    />
                                </InputAdornment>
                            }
                            sx={{ mr: 1, fontWeight: "fontWeightBold" }}
                        />
                        <Button
                            variant="contained"
                            onClick={searchButton}
                            style={{ color: "#EEEEEE" }}>
                            Search
                        </Button>
                    </StyledSearchbar>
                </Slide>
            </div>
        </ClickAwayListener>
    );
}
