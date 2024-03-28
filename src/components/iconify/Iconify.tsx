import { Icon } from "@iconify/react";
import Box from "@mui/material/Box";
import { forwardRef } from "react";

interface IconifyProps {
    icon: string;
    style: string;
}

const Iconify = forwardRef<unknown, IconifyProps>(
    ({ icon, style, ...other }, ref) => (
        <Box
            ref={ref}
            component={Icon}
            className="component-iconify"
            icon={icon}
            style={{ color: style }}
            {...other}
        />
    )
);

export default Iconify;
