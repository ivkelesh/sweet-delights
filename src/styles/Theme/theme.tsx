import { createTheme } from "@material-ui/core/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#556cd6",
    },
    secondary: {
      main: "#19857b",
    },
    error: {
      main: "#e53e3e",
    },
    background: {
      default: "#fff",
    },
  },
});

export default theme;
