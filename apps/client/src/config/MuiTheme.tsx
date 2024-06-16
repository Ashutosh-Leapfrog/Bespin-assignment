import { createTheme } from "@mui/material/styles";

import colors from "~/constants/colors";

const muiTheme = createTheme({
  palette: {
    primary: {
      main: colors.primary[500],
      50: colors.primary[50],
      100: colors.primary[100],
      200: colors.primary[200],
      300: colors.primary[300],
      400: colors.primary[400],
      500: colors.primary[500],
      600: colors.primary[600],
      700: colors.primary[700],
      800: colors.primary[800],
      900: colors.primary[900],
    },
    secondary: {
      main: colors.secondary[500],
      50: colors.secondary[50],
      100: colors.secondary[100],
      200: colors.secondary[200],
      300: colors.secondary[300],
      400: colors.secondary[400],
      500: colors.secondary[500],
      600: colors.secondary[600],
      700: colors.secondary[700],
      800: colors.secondary[800],
      900: colors.secondary[900],
    },
    background: {
      default: colors.background,
      paper: colors.white,
    },
    text: {
      primary: colors.text,
    },
  },
});

export default muiTheme;
