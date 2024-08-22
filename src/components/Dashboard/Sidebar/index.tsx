'use client';
import { useThemeMode } from '@/components/ThemeContext';
import AutoModeIcon from '@mui/icons-material/AutoMode';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Badge, Button, IconButton, Toolbar, Typography } from '@mui/material';
import * as React from 'react';
import { Menu, Sidebar } from 'react-pro-sidebar';
import NestedList from './Menu';

export default function PersistentDrawerLeft({
  children,
}: {
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = React.useState(false);
  const { mode, toggleMode } = useThemeMode();
  return (
    <div className="flex">
      <Sidebar collapsed={collapsed}>
        <Menu>
          <NestedList />
        </Menu>
      </Sidebar>
      <div style={{ padding: 10, width: '100%' }}>
        <div>
          <Toolbar className="justify-between w-full ">
            <div className="flex items-center">
              <IconButton
                color="inherit"
                aria-label="open drawer"
                className="sb-button"
                onClick={() => setCollapsed(!collapsed)}
                edge="start"
              >
                <MenuIcon
                  sx={{ mr: 2, ...(collapsed && { display: 'none' }) }}
                />
                <ChevronLeftIcon
                  sx={{ mr: 2, ...(!collapsed && { display: 'none' }) }}
                />
              </IconButton>
              <></>
              <Typography variant="h6" noWrap component="div">
                Dashboard
              </Typography>
            </div>
            <div className="flex items-center">
              <IconButton color="inherit">
                <Badge badgeContent={4} color="secondary">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              <Badge>
                {mode === 'dark' ? (
                  <Button onClick={() => toggleMode('system')}>
                    <DarkModeIcon color="primary" />
                  </Button>
                ) : (
                  (mode === 'light' && (
                    <Button onClick={() => toggleMode('dark')}>
                      <LightModeIcon color="success" />
                    </Button>
                  )) || (
                    <Button onClick={() => toggleMode('light')}>
                      <AutoModeIcon color="success" />
                    </Button>
                  )
                )}
              </Badge>
            </div>
          </Toolbar>
          <main className="w-full">{children}</main>
        </div>
      </div>
    </div>
  );
}
