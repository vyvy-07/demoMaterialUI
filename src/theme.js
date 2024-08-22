import { createTheme } from '@mui/material/styles';
// primary: xám
// secondary:
export const tokenColors = (mode) => ({
  ...(mode === 'dark'
    ? {
        primary: {
          100: '#eff7fa',
          200: '#deeff5',
          300: '#cee8f0',
          400: '#bde0eb',
          500: '#add8e6',
          600: '#8aadb8',
          700: '#68828a',
          800: '#45565c',
          900: '#232b2e',
        },
        secondary: {
          100: '#cdeefd',
          200: '#9bddfa',
          300: '#68cdf8',
          400: '#36bcf5',
          500: '#04abf3',
          600: '#0389c2',
          700: '#026792',
          800: '#024461',
          900: '#012231',
        },
        grey: {
          100: '#f6f6f6',
          200: '#ececec',
          300: '#e3e3e3',
          400: '#d8d8d8',
          500: '#cecece',
          600: '#a2a2a2',
          700: '#777777',
          800: '#4e4e4e',
          900: '#262626',
        },
        black: {
          100: '#fefefe',
          200: '#999999',
          300: '#666666',
          400: '#333333',
          500: '#000000',
        },
      }
    : {
        primary: {
          100: '#fcfcfc',
          200: '#f8f8f8',
          300: '#f5f5f5',
          400: '#f1f1f1',
          500: '#eeeeee',
          600: '#bebebe',
          700: '#8f8f8f',
          800: '#5f5f5f',
          900: '#303030',
        },
        secondary: {
          100: '#cdeefd',
          200: '#9bddfa',
          300: '#68cdf8',
          400: '#36bcf5',
          500: '#04abf3',
          600: '#0389c2',
          700: '#026792',
          800: '#024461',
          900: '#012231',
        },
        grey: {
          100: '#f6f6f6',
          200: '#ececec',
          300: '#e3e3e3',
          400: '#d8d8d8',
          500: '#cecece',
          600: '#a2a2a2',
          700: '#777777',
          800: '#4e4e4e',
          900: '#262626',
        },
        black: {
          100: '#fefefe',
          200: '#999999',
          300: '#666666',
          400: '#333333',
          500: '#000000',
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
        main: colors.secondary[100],
      },
      black: {
        main: colors.black[300],
      },
      grey: {
        main: colors.grey[700],
      },
      background: {
        default: mode === 'dark' ? colors.black[500] : colors.grey[100], // Sử dụng màu phù hợp cho `default`
        paper: mode === 'dark' ? colors.black[400] : colors.black[200], // Sử dụng màu phù hợp cho `paper`
      },
      text: {
        primary: mode === 'dark' ? colors.primary[100] : colors.black[500],
        secondary: mode === 'dark' ? colors.secondary[200] : colors.black[500],
      },
    },
  };
};

export const createAppTheme = (mode) => {
  return createTheme(getDesignTokens(mode));
};
