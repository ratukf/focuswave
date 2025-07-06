import { createContext, useMemo, useState, useContext } from "react";
import { createTheme, ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import { theme as baseTheme } from "../styles/theme";
import CssBaseline from "@mui/material/CssBaseline";

const ThemeContext = createContext({ toggleColorMode: () => { } });

export const useThemeMode = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [mode, setMode] = useState<"light" | "dark">(() =>
    (localStorage.getItem("theme-mode") as "light" | "dark") || "light"
  );

  const toggleColorMode = () => {
    setMode((prev) => {
      const newMode = prev === "light" ? "dark" : "light";
      localStorage.setItem("theme-mode", newMode);
      return newMode;
    });
  };

  const theme = useMemo(
    () =>
      createTheme({
        ...baseTheme,
        palette: {
          ...baseTheme.palette,
          mode,
          ...(mode === "dark"
            ? {
              background: {
                default: "#181A20",
                paper: "#23272F",
              },
              primary: { main: "#1A237E" },
              secondary: { main: "#5C6BC0" },
              text: {
                primary: "#FFFFFF",
                secondary: "#B0B3B8",
              },
              action: {
                active: "#FFFFFF",
                hover: "#6C6CFF",
                selected: "#5C6BC0",
                disabled: "#555A6A",
                disabledBackground: "rgba(255,255,255,0.08)",
                focus: "#B0B3B8",
              },
              divider: "rgba(255,255,255,0.12)",
            }
            : {}),
        },
        shape: { borderRadius: 10 },
        typography: { fontFamily: `"Inter", sans-serif` },
      }),
    [mode]
  );

  return (
    <ThemeContext.Provider value={{ toggleColorMode }}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};
