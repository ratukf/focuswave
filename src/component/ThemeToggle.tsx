import { IconButton } from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import { useTheme, Theme } from "@mui/material/styles";
import { useThemeMode } from "../context/ThemeContext";

export const ThemeToggle = () => {
    const theme: Theme = useTheme();
    const { toggleColorMode } = useThemeMode();

    return (
        <IconButton onClick={toggleColorMode} color="inherit">
            {theme.palette.mode === "dark" ? <Brightness7 /> : <Brightness4 />}
        </IconButton>
    );
};
