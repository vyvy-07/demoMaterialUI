import { createTheme } from '@mui/material/styles';
import { light } from '@mui/material/styles/createPalette';
// primary: xám
// secondary:

export const tokenColors = (mode) => ({
  ...(mode === 'dark'
    ? {
        primary: {
          100: '#eff7fa',
          500: '#add8e6',
          900: '#68828a',
        },
        secondary: {
          100: '#f5fcff',
          500: '#cdeefd',
          900: '#293033',
        },
        grey: {
          100: '#f6f6f6',
          500: '#262626',
        },
        black: {
          100: '#fefefe',
          500: '#1C252E',
        },
      }
    : {
        primary: {
          100: '#eff7fa',
          500: '#add8e6',
          900: '#68828a',
        },
        secondary: {
          100: '#f5fcff',
          500: '#cdeefd',
          900: '#293033',
        },
        grey: {
          100: '#f6f6f6',
          500: '#262626',
        },
        black: {
          100: '#fefefe',
          500: '#1C252E',
        },
      }),
});

export const getDesignTokens = (mode) => {
  const colors = tokenColors(mode);
  return {
    palette: {
      mode,
      primary: {
        main: colors.primary[500],
        light: colors.primary[100],
        dark: colors.primary[900],
      },
      secondary: {
        main: colors.secondary[500],
        light: colors.secondary[100],
        dark: colors.secondary[900],
      },
      black: {
        main: colors.black[500],
        light: colors.black[100],
        dark: colors.black[900],
      },
      grey: {
        main: colors.grey[100],
      },
      background: {
        default: mode === 'dark' ? colors.black[500] : colors.secondary[100],
        paper: mode === 'dark' ? colors.black[500] : colors.black[100],
      },
      text: {
        primary: mode === 'dark' ? colors.primary[100] : colors.black[500],
        secondary: mode === 'dark' ? colors.secondary[500] : colors.black[500],
      },
    },
  };
};

export const createAppTheme = (mode) => {
  return createTheme(getDesignTokens(mode));
};
