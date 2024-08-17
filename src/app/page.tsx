'use client';
import Chart from '@/components/Dashboard/Chart';
import Deposits from '@/components/Dashboard/Deposits';
import Orders from '@/components/Dashboard/Orders';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Toolbar from '@mui/material/Toolbar';
import * as React from 'react';

export default function Dashboard() {
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <div>
      <div className="bg-emerald-300 w-full h-screen">
        import AutoModeIcon from '@mui/icons-material/AutoMode'; import
        DarkModeIcon from '@mui/icons-material/DarkMode'; import LightModeIcon
        from '@mui/icons-material/LightMode'; import NotificationsIcon from
        '@mui/icons-material/Notifications'; import rom '../ThemeContext';
      </div>
    </div>
  );
}
