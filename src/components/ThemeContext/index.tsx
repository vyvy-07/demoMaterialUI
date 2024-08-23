'use client';

import { createAppTheme } from '@/theme';
import { CssBaseline, ThemeProvider } from '@mui/material';
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

type Mode = 'light' | 'dark' | '';

// Interface for the context value
interface ThemeContextProps {
  mode: Mode;
  toggleMode: (selectedMode: Mode) => void;
}

// Create the context with a default value of undefined
const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const useThemeMode = (): ThemeContextProps => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeMode must be used within a ThemeModeProvider');
  }
  return context;
};
export const ThemeModeProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [mode, setMode] = useState<Mode>('light');
  const toggleMode = (selectedMode: Mode) => {
    setMode(selectedMode);
    localStorage.setItem('themeMode', selectedMode);
  };
  const theme = createAppTheme(mode);
  useEffect(() => {
    const modeCurrent = localStorage?.getItem('themeMode') as Mode;
    if (modeCurrent) {
      setMode(modeCurrent);
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ mode, toggleMode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};
