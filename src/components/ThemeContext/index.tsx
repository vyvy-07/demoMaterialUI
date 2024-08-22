'use client';

import { createAppTheme } from '@/theme';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';

type Mode = 'light' | 'dark' | 'system';

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
const isMode = (value: any): value is Mode => {
  return value === 'light' || value === 'dark' || value === 'system';
};
export const ThemeModeProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [mode, setMode] = useState<Mode>(() => {
    if (typeof window !== 'undefined') {
      // Check if running in a browser
      const savedMode = localStorage.getItem('themeMode');
      if (isMode(savedMode)) {
        return savedMode;
      }
    }
    return 'system'; // Default to 'system' if no valid mode is found or not in a browser environment
  });

  useEffect(() => {
    localStorage.setItem('themeMode', mode);
  }, [mode]);

  const theme = useMemo(() => {
    const currentMode =
      mode === 'system'
        ? typeof window !== 'undefined' &&
          window.matchMedia('(prefers-color-scheme: dark)').matches
          ? 'dark'
          : 'light'
        : mode;
    return createAppTheme(currentMode);
  }, [mode]);

  const toggleMode = (selectedMode: Mode) => setMode(selectedMode);

  return (
    <ThemeContext.Provider value={{ mode, toggleMode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};
