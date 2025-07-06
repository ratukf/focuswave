import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1A237E",
    },
    secondary: {
      main: "#5C6BC0",
    },
    background: {
      default: "#FFFFFF",
      paper: "#F5F7FA",
    },
  },
  shape: {
    borderRadius: 12,
  },
  typography: {
    fontFamily: `'Inter', 'Roboto', sans-serif`,
    h4: {
      color: '#1A237E',
      fontWeight: 700,
    },
  },
});
