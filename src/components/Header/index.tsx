'use client';
import { Badge, Button, IconButton, Toolbar, Typography } from '@mui/material';

import AutoModeIcon from '@mui/icons-material/AutoMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useThemeMode } from '../ThemeContext';

const Header = () => {
  const { toggleMode, mode } = useThemeMode();
  console.log('mode :>> ', mode);

  return (
    <>
      <header className="header ">
        <Toolbar
          className="fixed top-0 w-full z-50  bg-blue-400"
          sx={{
            pr: '24px', // keep right padding when drawer closed
          }}
        >
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1 }}
          >
            Dashboard
          </Typography>
          <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <Badge color="secondary">
            {mode === 'dark' ? (
              <Button onClick={() => toggleMode('system')}>
                <DarkModeIcon />
              </Button>
            ) : (
              (mode === 'light' && (
                <Button onClick={() => toggleMode('dark')}>
                  <LightModeIcon />
                </Button>
              )) || (
                <Button onClick={() => toggleMode('light')}>
                  <AutoModeIcon />
                </Button>
              )
            )}
          </Badge>
        </Toolbar>
      </header>
    </>
  );
};

export default Header;
