import { createTheme } from '@mui/material/styles';
// primary: xám
// secondary:
export const tokenColors = (mode) => ({
  ...(mode === 'dark'
    ? {
        primary: {
          100: '#eff7fa',
          500: '#add8e6',
        },
        secondary: {
          100: '#cdeefd',
          500: '#04abf3',
        },
        grey: {
          100: '#f6f6f6',
          500: '#262626',
        },
        black: {
          100: '#fefefe',
          500: '#000000',
        },
      }
    : {
        primary: {
          100: '#eff7fa',
          500: '#add8e6',
        },
        secondary: {
          100: '#cdeefd',
          500: '#04abf3',
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
      },
      secondary: {
        main: colors.secondary[500],
      },
      black: {
        main: colors.black[500],
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
