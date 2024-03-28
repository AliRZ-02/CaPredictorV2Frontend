import Box from "@mui/material/Box";
import { ReactNode } from "react";

interface MainProps {
    children: ReactNode;
}

export default function Main({ children, ...other }: MainProps) {
    return (
        <Box component="main" {...other}>
            {children}
        </Box>
    );
}
